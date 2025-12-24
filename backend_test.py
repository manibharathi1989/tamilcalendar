#!/usr/bin/env python3
"""
Backend API Testing for Tamil Daily Calendar
Tests all API endpoints to verify backend functionality
"""

import requests
import json
import os
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

class TamilCalendarAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.admin_token = None
        self.test_results = []
        
    def log_test(self, test_name, success, message, response_data=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat()
        }
        if response_data:
            result["response_data"] = response_data
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        
    def test_daily_calendar_endpoint(self):
        """Test GET /api/calendar/daily/{year}/{month}/{day}"""
        test_name = "Daily Calendar Endpoint"
        try:
            url = f"{self.base_url}/api/calendar/daily/2025/12/25"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check required fields
                required_fields = ['tamil_date', 'nalla_neram', 'raahu_kaalam']
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test(test_name, False, f"Missing required fields: {missing_fields}", data)
                else:
                    # Verify data structure
                    if isinstance(data.get('nalla_neram'), dict) and 'raahu_kaalam' in data:
                        self.log_test(test_name, True, "Daily calendar data returned with correct structure", {
                            "tamil_date": data.get('tamil_date'),
                            "nalla_neram": data.get('nalla_neram'),
                            "raahu_kaalam": data.get('raahu_kaalam')
                        })
                    else:
                        self.log_test(test_name, False, "Data structure incorrect", data)
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def test_search_endpoint(self):
        """Test GET /api/calendar/search"""
        test_name = "Search Endpoint"
        try:
            url = f"{self.base_url}/api/calendar/search"
            params = {
                "start_date": "2025-12-01",
                "end_date": "2025-12-31"
            }
            response = requests.get(url, params=params, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_test(test_name, True, f"Search returned {len(data)} results", {
                        "results_count": len(data),
                        "sample_result": data[0] if data else None
                    })
                else:
                    self.log_test(test_name, False, "Search should return array", data)
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def test_special_days_endpoint(self):
        """Test GET /api/calendar/special-days/{year}/{month}"""
        test_name = "Special Days Endpoint"
        try:
            url = f"{self.base_url}/api/calendar/special-days/2025/12"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check if it's a dictionary with expected keys
                expected_keys = ['amavasai', 'pournami', 'karthigai', 'ekadhasi']
                if isinstance(data, dict) and any(key in data for key in expected_keys):
                    special_days_count = sum(len(v) if isinstance(v, list) else 0 for v in data.values())
                    self.log_test(test_name, True, f"Special days data returned with {special_days_count} total events", {
                        "categories": list(data.keys()),
                        "total_events": special_days_count
                    })
                else:
                    self.log_test(test_name, False, "Special days data structure incorrect", data)
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def test_admin_login_endpoint(self):
        """Test POST /api/admin/login"""
        test_name = "Admin Login Endpoint"
        try:
            url = f"{self.base_url}/api/admin/login"
            payload = {
                "username": "admin",
                "password": "admin123"
            }
            
            # First try with admin123 (as mentioned in review request)
            response = requests.post(url, json=payload, timeout=10)
            
            if response.status_code == 401:
                # Try with tamil123 (as seen in admin_routes.py)
                payload["password"] = "tamil123"
                response = requests.post(url, json=payload, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if 'token' in data:
                    self.admin_token = data['token']
                    self.log_test(test_name, True, "Admin login successful, token received", {
                        "success": data.get('success'),
                        "message": data.get('message'),
                        "token_received": True
                    })
                else:
                    self.log_test(test_name, False, "Login response missing token", data)
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def test_admin_analytics_endpoint(self):
        """Test GET /api/admin/analytics (requires auth)"""
        test_name = "Admin Analytics Endpoint"
        
        if not self.admin_token:
            self.log_test(test_name, False, "No admin token available - login test must pass first")
            return
            
        try:
            url = f"{self.base_url}/api/admin/analytics"
            headers = {
                "Authorization": f"Bearer {self.admin_token}"
            }
            response = requests.get(url, headers=headers, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check required analytics fields
                required_fields = ['totalDays', 'totalSpecialDays']
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test(test_name, False, f"Missing required analytics fields: {missing_fields}", data)
                else:
                    self.log_test(test_name, True, "Analytics data returned successfully", {
                        "totalDays": data.get('totalDays'),
                        "totalSpecialDays": data.get('totalSpecialDays'),
                        "yearsAvailable": data.get('yearsAvailable'),
                        "monthsWithData": data.get('monthsWithData')
                    })
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def test_additional_endpoints(self):
        """Test additional endpoints for completeness"""
        
        # Test root endpoint
        try:
            url = f"{self.base_url}/api/"
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                self.log_test("Root API Endpoint", True, "Root endpoint accessible")
            else:
                self.log_test("Root API Endpoint", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Root API Endpoint", False, f"Exception: {str(e)}")
        
        # Test available years endpoint
        try:
            url = f"{self.base_url}/api/calendar/years"
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if 'years' in data and isinstance(data['years'], list):
                    self.log_test("Available Years Endpoint", True, f"Years available: {len(data['years'])}")
                else:
                    self.log_test("Available Years Endpoint", False, "Invalid years data structure")
            else:
                self.log_test("Available Years Endpoint", False, f"HTTP {response.status_code}")
        except Exception as e:
            self.log_test("Available Years Endpoint", False, f"Exception: {str(e)}")
    
    def test_parigaram_accuracy(self):
        """Test Parigaram calculation accuracy based on weekday/Soolam direction"""
        test_name = "Parigaram Accuracy Test"
        
        # Reference data from tamilnaalkaati.com
        test_dates = [
            {"date": "2025-12-22", "weekday": "Monday", "expected_soolam": "கிழக்கு", "expected_parigaram": "தயிர்"},
            {"date": "2025-12-23", "weekday": "Tuesday", "expected_soolam": "வடக்கு", "expected_parigaram": "பால்"},
            {"date": "2025-12-24", "weekday": "Wednesday", "expected_soolam": "மேற்கு", "expected_parigaram": "தேன்"},
            {"date": "2025-12-25", "weekday": "Thursday", "expected_soolam": "தெற்கு", "expected_parigaram": "நெய்"},
            {"date": "2025-12-26", "weekday": "Friday", "expected_soolam": "வடக்கு", "expected_parigaram": "பால்"},
            {"date": "2025-12-27", "weekday": "Saturday", "expected_soolam": "கிழக்கு", "expected_parigaram": "தயிர்"},
            {"date": "2025-12-28", "weekday": "Sunday", "expected_soolam": "மேற்கு", "expected_parigaram": "தேன்"}
        ]
        
        all_passed = True
        results = []
        
        for test_case in test_dates:
            try:
                date_parts = test_case["date"].split("-")
                year, month, day = int(date_parts[0]), int(date_parts[1]), int(date_parts[2])
                
                url = f"{self.base_url}/api/calendar/daily/{year}/{month}/{day}"
                response = requests.get(url, timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    
                    # Check Soolam
                    actual_soolam = data.get('soolam', {}).get('tamil', '')
                    expected_soolam = test_case["expected_soolam"]
                    
                    # Check Parigaram
                    actual_parigaram = data.get('parigaram', {}).get('tamil', '')
                    expected_parigaram = test_case["expected_parigaram"]
                    
                    soolam_match = actual_soolam == expected_soolam
                    parigaram_match = actual_parigaram == expected_parigaram
                    
                    test_result = {
                        "date": test_case["date"],
                        "weekday": test_case["weekday"],
                        "soolam_expected": expected_soolam,
                        "soolam_actual": actual_soolam,
                        "soolam_match": soolam_match,
                        "parigaram_expected": expected_parigaram,
                        "parigaram_actual": actual_parigaram,
                        "parigaram_match": parigaram_match,
                        "overall_pass": soolam_match and parigaram_match
                    }
                    
                    results.append(test_result)
                    
                    if not (soolam_match and parigaram_match):
                        all_passed = False
                        
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
        
        if all_passed:
            self.log_test(test_name, True, "All Parigaram calculations match reference data", results)
        else:
            failed_dates = [r for r in results if not r.get('overall_pass', False)]
            self.log_test(test_name, False, f"Parigaram mismatch found in {len(failed_dates)} dates", {
                "failed_dates": failed_dates,
                "all_results": results
            })
    
    def test_search_by_event_type(self):
        """Test search functionality by event type"""
        test_name = "Search by Event Type"
        
        search_tests = [
            {
                "name": "Pournami Search December 2025",
                "params": {
                    "start_date": "2025-12-01",
                    "end_date": "2025-12-31",
                    "event_type": "pournami"
                },
                "expected_dates": ["2025-12-04"]  # Expected Pournami date
            },
            {
                "name": "Amavasai Search December 2025",
                "params": {
                    "start_date": "2025-12-01",
                    "end_date": "2025-12-31",
                    "event_type": "amavasai"
                },
                "expected_dates": ["2025-12-19"]  # Expected Amavasai date
            },
            {
                "name": "All Events December 2025",
                "params": {
                    "start_date": "2025-12-01",
                    "end_date": "2025-12-31"
                },
                "min_expected": 2  # Should have at least Pournami and Amavasai
            }
        ]
        
        all_passed = True
        results = []
        
        for search_test in search_tests:
            try:
                url = f"{self.base_url}/api/calendar/search"
                response = requests.get(url, params=search_test["params"], timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    
                    if isinstance(data, list):
                        # Extract dates from results
                        result_dates = []
                        for event in data:
                            if 'date' in event:
                                # Handle both string and datetime formats
                                event_date = event['date']
                                if isinstance(event_date, str):
                                    if 'T' in event_date:
                                        event_date = event_date.split('T')[0]
                                    result_dates.append(event_date)
                        
                        test_result = {
                            "test_name": search_test["name"],
                            "params": search_test["params"],
                            "results_count": len(data),
                            "result_dates": result_dates,
                            "raw_results": data[:3]  # First 3 results for debugging
                        }
                        
                        # Check expectations
                        if "expected_dates" in search_test:
                            expected_found = all(date in result_dates for date in search_test["expected_dates"])
                            test_result["expected_dates"] = search_test["expected_dates"]
                            test_result["expected_found"] = expected_found
                            test_result["pass"] = expected_found
                            
                            if not expected_found:
                                all_passed = False
                        elif "min_expected" in search_test:
                            meets_minimum = len(data) >= search_test["min_expected"]
                            test_result["min_expected"] = search_test["min_expected"]
                            test_result["meets_minimum"] = meets_minimum
                            test_result["pass"] = meets_minimum
                            
                            if not meets_minimum:
                                all_passed = False
                        
                        results.append(test_result)
                    else:
                        all_passed = False
                        results.append({
                            "test_name": search_test["name"],
                            "error": "Response is not a list",
                            "response": data
                        })
                else:
                    all_passed = False
                    results.append({
                        "test_name": search_test["name"],
                        "error": f"HTTP {response.status_code}: {response.text}"
                    })
                    
            except Exception as e:
                all_passed = False
                results.append({
                    "test_name": search_test["name"],
                    "error": f"Exception: {str(e)}"
                })
        
        if all_passed:
            self.log_test(test_name, True, "All search functionality tests passed", results)
        else:
            failed_tests = [r for r in results if not r.get('pass', False)]
            self.log_test(test_name, False, f"Search functionality issues found in {len(failed_tests)} tests", {
                "failed_tests": failed_tests,
                "all_results": results
            })

    def run_all_tests(self):
        """Run all API tests"""
        print("=" * 60)
        print("TAMIL DAILY CALENDAR - BACKEND API TESTING")
        print("=" * 60)
        
        # Test specific requirements from review request
        print("\n🔍 TESTING PARIGARAM ACCURACY & SEARCH FUNCTIONALITY")
        print("-" * 60)
        self.test_parigaram_accuracy()
        self.test_search_by_event_type()
        
        print("\n🔍 TESTING CORE API ENDPOINTS")
        print("-" * 60)
        # Test core endpoints
        self.test_daily_calendar_endpoint()
        self.test_search_endpoint()
        self.test_special_days_endpoint()
        self.test_admin_login_endpoint()
        self.test_admin_analytics_endpoint()
        
        # Test additional endpoints
        self.test_additional_endpoints()
        
        # Summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
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
                print(f"  - {test['test']}: {test['message']}")
        
        return self.test_results

if __name__ == "__main__":
    tester = TamilCalendarAPITester()
    results = tester.run_all_tests()
    
    # Save results to file
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(results, f, indent=2, default=str)
    
    print(f"\nDetailed results saved to: /app/backend_test_results.json")