#!/usr/bin/env python3
"""
Tamil Calendar Backend API Data Accuracy Test
Focused testing for Star/Nakshatra time variation and Soolam/Parigaram consistency
"""

import requests
import json
import os
import re
from datetime import datetime

# Load environment variables
def get_backend_url():
    """Get backend URL from frontend .env file"""
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        return "https://tamilmanai.preview.emergentagent.com"
    return "https://tamilmanai.preview.emergentagent.com"

BASE_URL = get_backend_url()
print(f"Testing backend at: {BASE_URL}")

class StarDataAccuracyTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.test_results = []
        
    def log_test(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat()
        }
        if details:
            result["details"] = details
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details and not success:
            print(f"    Details: {json.dumps(details, indent=2, default=str)}")
    
    def extract_star_time(self, star_text):
        """Extract time from star text like 'இன்று அதிகாலை 05:31 AM வரை உத்திராடம் பின்பு திருவோணம்'"""
        if not star_text:
            return None
        
        # Look for time patterns like "05:31 AM" or "02:52 AM"
        time_pattern = r'(\d{1,2}):(\d{2})\s*(AM|PM|கா|மா)'
        match = re.search(time_pattern, star_text)
        
        if match:
            hour = int(match.group(1))
            minute = int(match.group(2))
            period = match.group(3)
            
            # Convert to 24-hour format for comparison
            if period in ['PM', 'மா'] and hour != 12:
                hour += 12
            elif period in ['AM', 'கா'] and hour == 12:
                hour = 0
                
            return f"{hour:02d}:{minute:02d}"
        
        return None
    
    def test_star_time_variation(self):
        """Test 1: Star/Nakshatra Time Variation"""
        test_name = "Star/Nakshatra Time Variation"
        
        # Test dates from review request
        test_dates = [
            {"date": "2025-12-20", "expected_time": "02:52"},
            {"date": "2025-12-21", "expected_time": "03:45"},
            {"date": "2025-12-22", "expected_time": "04:38"},
            {"date": "2025-12-23", "expected_time": "05:31"},  # Reference match
            {"date": "2025-12-24", "expected_time": "06:24"},
            {"date": "2025-12-25", "expected_time": "07:17"}
        ]
        
        results = []
        all_passed = True
        star_times_vary = False
        
        for test_case in test_dates:
            try:
                date_parts = test_case["date"].split("-")
                year, month, day = int(date_parts[0]), int(date_parts[1]), int(date_parts[2])
                
                url = f"{self.base_url}/api/calendar/daily/{year}/{month}/{day}"
                response = requests.get(url, timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    star_text = data.get('star', '')
                    actual_time = self.extract_star_time(star_text)
                    expected_time = test_case["expected_time"]
                    
                    result = {
                        "date": test_case["date"],
                        "star_text": star_text,
                        "expected_time": expected_time,
                        "actual_time": actual_time,
                        "time_match": actual_time and expected_time in actual_time if actual_time else False
                    }
                    
                    results.append(result)
                    
                    # Check if we have time variation (different times across dates)
                    if actual_time and len(results) > 1:
                        previous_times = [r["actual_time"] for r in results[:-1] if r["actual_time"]]
                        if previous_times and actual_time not in previous_times:
                            star_times_vary = True
                    
                else:
                    all_passed = False
                    results.append({
                        "date": test_case["date"],
                        "error": f"HTTP {response.status_code}: {response.text}"
                    })
                    
            except Exception as e:
                all_passed = False
                results.append({
                    "date": test_case["date"],
                    "error": f"Exception: {str(e)}"
                })
        
        # Check if star times show variation
        unique_times = set(r["actual_time"] for r in results if r.get("actual_time"))
        has_variation = len(unique_times) > 1
        
        if all_passed and has_variation:
            self.log_test(test_name, True, f"Star times show proper variation across dates. Found {len(unique_times)} different transition times.", results)
        elif not has_variation:
            self.log_test(test_name, False, f"Star times do not vary across dates. Only found {len(unique_times)} unique times.", results)
        else:
            self.log_test(test_name, False, "Failed to retrieve star data for some dates", results)
    
    def test_soolam_parigaram_consistency(self):
        """Test 2: Soolam and Parigaram Consistency"""
        test_name = "Soolam and Parigaram Consistency"
        
        # Expected mapping from review request
        weekday_mapping = {
            "Monday": {"soolam": "கிழக்கு", "parigaram": "தயிர்"},
            "Tuesday": {"soolam": "வடக்கு", "parigaram": "பால்"},
            "Wednesday": {"soolam": "மேற்கு", "parigaram": "தேன்"},
            "Thursday": {"soolam": "தெற்கு", "parigaram": "தைலம்"},  # CORRECTED: தைலம் (Oil)
            "Friday": {"soolam": "வடக்கு", "parigaram": "பால்"},
            "Saturday": {"soolam": "கிழக்கு", "parigaram": "தயிர்"},
            "Sunday": {"soolam": "மேற்கு", "parigaram": "தேன்"}
        }
        
        # Test dates from review request
        test_dates = [
            {"date": "2025-12-22", "weekday": "Monday"},
            {"date": "2025-12-23", "weekday": "Tuesday"},  # Reference
            {"date": "2025-12-24", "weekday": "Wednesday"},
            {"date": "2025-12-25", "weekday": "Thursday"},
            {"date": "2025-12-26", "weekday": "Friday"},
            {"date": "2025-12-27", "weekday": "Saturday"},
            {"date": "2025-12-28", "weekday": "Sunday"}
        ]
        
        results = []
        all_passed = True
        
        for test_case in test_dates:
            try:
                date_parts = test_case["date"].split("-")
                year, month, day = int(date_parts[0]), int(date_parts[1]), int(date_parts[2])
                
                url = f"{self.base_url}/api/calendar/daily/{year}/{month}/{day}"
                response = requests.get(url, timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    
                    # Extract Soolam and Parigaram
                    soolam_data = data.get('soolam', {})
                    parigaram_data = data.get('parigaram', {})
                    
                    actual_soolam = soolam_data.get('tamil', '') if isinstance(soolam_data, dict) else str(soolam_data)
                    actual_parigaram = parigaram_data.get('tamil', '') if isinstance(parigaram_data, dict) else str(parigaram_data)
                    
                    # Get expected values
                    weekday = test_case["weekday"]
                    expected_soolam = weekday_mapping[weekday]["soolam"]
                    expected_parigaram = weekday_mapping[weekday]["parigaram"]
                    
                    # Check matches
                    soolam_match = actual_soolam == expected_soolam
                    parigaram_match = actual_parigaram == expected_parigaram
                    
                    result = {
                        "date": test_case["date"],
                        "weekday": weekday,
                        "expected_soolam": expected_soolam,
                        "actual_soolam": actual_soolam,
                        "soolam_match": soolam_match,
                        "expected_parigaram": expected_parigaram,
                        "actual_parigaram": actual_parigaram,
                        "parigaram_match": parigaram_match,
                        "overall_pass": soolam_match and parigaram_match
                    }
                    
                    results.append(result)
                    
                    if not (soolam_match and parigaram_match):
                        all_passed = False
                        
                else:
                    all_passed = False
                    results.append({
                        "date": test_case["date"],
                        "weekday": test_case["weekday"],
                        "error": f"HTTP {response.status_code}: {response.text}"
                    })
                    
            except Exception as e:
                all_passed = False
                results.append({
                    "date": test_case["date"],
                    "weekday": test_case["weekday"],
                    "error": f"Exception: {str(e)}"
                })
        
        if all_passed:
            self.log_test(test_name, True, "All Soolam and Parigaram values match expected weekday-based calculations", results)
        else:
            failed_dates = [r for r in results if not r.get('overall_pass', False)]
            self.log_test(test_name, False, f"Soolam/Parigaram mismatch found in {len(failed_dates)} dates", {
                "failed_dates": failed_dates,
                "all_results": results
            })
    
    def test_monthly_calendar_variation(self):
        """Test 3: Monthly Calendar Data Variation"""
        test_name = "Monthly Calendar Data Variation"
        
        try:
            url = f"{self.base_url}/api/calendar/monthly/2025/12"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check if monthly data exists and has structure
                if isinstance(data, dict):
                    # Test a few daily endpoints to verify star time variation in monthly context
                    daily_tests = []
                    for day in [20, 21, 22, 23, 24, 25]:
                        try:
                            daily_url = f"{self.base_url}/api/calendar/daily/2025/12/{day}"
                            daily_response = requests.get(daily_url, timeout=10)
                            
                            if daily_response.status_code == 200:
                                daily_data = daily_response.json()
                                star_text = daily_data.get('star', '')
                                star_time = self.extract_star_time(star_text)
                                
                                daily_tests.append({
                                    "day": day,
                                    "star_text": star_text,
                                    "star_time": star_time
                                })
                        except Exception as e:
                            daily_tests.append({
                                "day": day,
                                "error": str(e)
                            })
                    
                    # Check for variation in star times
                    unique_star_times = set(t["star_time"] for t in daily_tests if t.get("star_time"))
                    has_variation = len(unique_star_times) > 1
                    
                    if has_variation:
                        self.log_test(test_name, True, f"Monthly calendar API accessible and daily data shows star time variation. Found {len(unique_star_times)} different star transition times.", {
                            "monthly_data_structure": list(data.keys()) if isinstance(data, dict) else "Not a dict",
                            "daily_star_variations": daily_tests,
                            "unique_star_times": list(unique_star_times)
                        })
                    else:
                        self.log_test(test_name, False, f"Monthly calendar API accessible but star times do not show variation. Only {len(unique_star_times)} unique times found.", {
                            "monthly_data": data,
                            "daily_tests": daily_tests
                        })
                else:
                    self.log_test(test_name, False, "Monthly calendar API returned unexpected data structure", data)
            else:
                self.log_test(test_name, False, f"Monthly calendar API failed: HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception testing monthly calendar: {str(e)}")
    
    def run_data_accuracy_tests(self):
        """Run all data accuracy tests"""
        print("=" * 70)
        print("TAMIL CALENDAR - STAR DATA ACCURACY TESTING")
        print("=" * 70)
        print(f"Backend URL: {self.base_url}")
        print()
        
        # Run the three specific tests from review request
        print("🔍 TEST 1: Star/Nakshatra Time Variation")
        print("-" * 50)
        self.test_star_time_variation()
        
        print("\n🔍 TEST 2: Soolam and Parigaram Consistency")
        print("-" * 50)
        self.test_soolam_parigaram_consistency()
        
        print("\n🔍 TEST 3: Monthly Calendar Data Variation")
        print("-" * 50)
        self.test_monthly_calendar_variation()
        
        # Summary
        print("\n" + "=" * 70)
        print("DATA ACCURACY TEST SUMMARY")
        print("=" * 70)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        # Show failed tests
        failed_tests = [result for result in self.test_results if not result['success']]
        if failed_tests:
            print("\nFAILED TESTS:")
            for test in failed_tests:
                print(f"  ❌ {test['test']}: {test['message']}")
        else:
            print("\n🎉 ALL DATA ACCURACY TESTS PASSED!")
        
        return self.test_results

if __name__ == "__main__":
    tester = StarDataAccuracyTester()
    results = tester.run_data_accuracy_tests()
    
    # Save results to file
    with open('/app/star_data_accuracy_results.json', 'w') as f:
        json.dump(results, f, indent=2, default=str)
    
    print(f"\nDetailed results saved to: /app/star_data_accuracy_results.json")