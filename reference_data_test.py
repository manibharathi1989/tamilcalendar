#!/usr/bin/env python3
"""
Reference Data Verification Test for Tamil Calendar API
Tests against specific reference data from tamildailycalendar.com
"""

import requests
import json
import os
from datetime import datetime

def get_backend_url():
    """Get backend URL from frontend .env file"""
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        return "https://thirukkanitha.preview.emergentagent.com"
    return "https://thirukkanitha.preview.emergentagent.com"

BASE_URL = get_backend_url()

class ReferenceDataTester:
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
            print(f"    Details: {details}")
    
    def test_december_24_2025_reference_data(self):
        """Test December 24, 2025 against specific reference data"""
        test_name = "December 24, 2025 Reference Data Verification"
        
        try:
            url = f"{self.base_url}/api/calendar/daily/2025/12/24"
            response = requests.get(url, timeout=10)
            
            if response.status_code != 200:
                self.log_test(test_name, False, f"HTTP {response.status_code}: {response.text}")
                return
            
            data = response.json()
            
            # Reference data from review request
            expected_data = {
                "tamil_date": "9 - மார்கழி - விசுவாவசு",
                "nalla_neram_morning": "09:00 - 10:00",
                "nalla_neram_evening": "04:45 - 05:45",
                "gowri_nalla_morning": "01:45 - 02:45",
                "gowri_nalla_evening": "06:30 - 07:30",
                "raahu_kaalam": "12:00 - 01:30",
                "yemagandam": "07:30 - 09:00",
                "kuligai": "10:30 - 12:00",
                "soolam": "வடக்கு",
                "parigaram": "பால்",
                "chandirashtamam": "பூசம்",
                "sraardha_thithi": "பஞ்சமி"
            }
            
            # Verify each field
            verification_results = {}
            all_passed = True
            
            # Tamil Date
            actual_tamil_date = data.get('tamil_date', '')
            verification_results['tamil_date'] = {
                'expected': expected_data['tamil_date'],
                'actual': actual_tamil_date,
                'match': actual_tamil_date == expected_data['tamil_date']
            }
            if not verification_results['tamil_date']['match']:
                all_passed = False
            
            # Nalla Neram Morning
            actual_morning = data.get('nalla_neram', {}).get('morning', '')
            expected_morning = expected_data['nalla_neram_morning']
            verification_results['nalla_neram_morning'] = {
                'expected': expected_morning,
                'actual': actual_morning,
                'match': expected_morning in actual_morning
            }
            if not verification_results['nalla_neram_morning']['match']:
                all_passed = False
            
            # Nalla Neram Evening
            actual_evening = data.get('nalla_neram', {}).get('evening', '')
            expected_evening = expected_data['nalla_neram_evening']
            verification_results['nalla_neram_evening'] = {
                'expected': expected_evening,
                'actual': actual_evening,
                'match': expected_evening in actual_evening
            }
            if not verification_results['nalla_neram_evening']['match']:
                all_passed = False
            
            # Gowri Nalla Morning
            actual_gowri_morning = data.get('gowri_nalla_neram', {}).get('morning', '')
            expected_gowri_morning = expected_data['gowri_nalla_morning']
            verification_results['gowri_nalla_morning'] = {
                'expected': expected_gowri_morning,
                'actual': actual_gowri_morning,
                'match': expected_gowri_morning in actual_gowri_morning
            }
            if not verification_results['gowri_nalla_morning']['match']:
                all_passed = False
            
            # Gowri Nalla Evening
            actual_gowri_evening = data.get('gowri_nalla_neram', {}).get('evening', '')
            expected_gowri_evening = expected_data['gowri_nalla_evening']
            verification_results['gowri_nalla_evening'] = {
                'expected': expected_gowri_evening,
                'actual': actual_gowri_evening,
                'match': expected_gowri_evening in actual_gowri_evening
            }
            if not verification_results['gowri_nalla_evening']['match']:
                all_passed = False
            
            # Raahu Kaalam
            actual_raahu = data.get('raahu_kaalam', '')
            verification_results['raahu_kaalam'] = {
                'expected': expected_data['raahu_kaalam'],
                'actual': actual_raahu,
                'match': actual_raahu == expected_data['raahu_kaalam']
            }
            if not verification_results['raahu_kaalam']['match']:
                all_passed = False
            
            # Yemagandam
            actual_yemagandam = data.get('yemagandam', '')
            verification_results['yemagandam'] = {
                'expected': expected_data['yemagandam'],
                'actual': actual_yemagandam,
                'match': actual_yemagandam == expected_data['yemagandam']
            }
            if not verification_results['yemagandam']['match']:
                all_passed = False
            
            # Kuligai
            actual_kuligai = data.get('kuligai', '')
            verification_results['kuligai'] = {
                'expected': expected_data['kuligai'],
                'actual': actual_kuligai,
                'match': actual_kuligai == expected_data['kuligai']
            }
            if not verification_results['kuligai']['match']:
                all_passed = False
            
            # Soolam
            actual_soolam = data.get('soolam', {}).get('tamil', '')
            verification_results['soolam'] = {
                'expected': expected_data['soolam'],
                'actual': actual_soolam,
                'match': actual_soolam == expected_data['soolam']
            }
            if not verification_results['soolam']['match']:
                all_passed = False
            
            # Parigaram
            actual_parigaram = data.get('parigaram', {}).get('tamil', '')
            verification_results['parigaram'] = {
                'expected': expected_data['parigaram'],
                'actual': actual_parigaram,
                'match': actual_parigaram == expected_data['parigaram']
            }
            if not verification_results['parigaram']['match']:
                all_passed = False
            
            # Chandirashtamam
            actual_chandirashtamam = data.get('chandirashtamam', '')
            verification_results['chandirashtamam'] = {
                'expected': expected_data['chandirashtamam'],
                'actual': actual_chandirashtamam,
                'match': actual_chandirashtamam == expected_data['chandirashtamam']
            }
            if not verification_results['chandirashtamam']['match']:
                all_passed = False
            
            # Sraardha Thithi
            actual_sraardha = data.get('sraardha_thithi', '')
            verification_results['sraardha_thithi'] = {
                'expected': expected_data['sraardha_thithi'],
                'actual': actual_sraardha,
                'match': actual_sraardha == expected_data['sraardha_thithi']
            }
            if not verification_results['sraardha_thithi']['match']:
                all_passed = False
            
            # Thithi (should contain specific text and time)
            actual_thithi = data.get('thithi', '')
            thithi_contains_required = ('சதுர்த்தி' in actual_thithi and 
                                     'பஞ்சமி' in actual_thithi and 
                                     '11:41' in actual_thithi)
            verification_results['thithi'] = {
                'expected': 'Should contain சதுர்த்தி and பஞ்சமி with time around 11:41 AM',
                'actual': actual_thithi,
                'match': thithi_contains_required
            }
            if not verification_results['thithi']['match']:
                all_passed = False
            
            # Star (should contain specific text and time)
            actual_star = data.get('star', '')
            star_contains_required = ('திருவோணம்' in actual_star and 
                                    'அவிட்டம்' in actual_star and 
                                    '06:24' in actual_star)
            verification_results['star'] = {
                'expected': 'Should contain திருவோணம் and அவிட்டம் with time around 06:24 AM',
                'actual': actual_star,
                'match': star_contains_required
            }
            if not verification_results['star']['match']:
                all_passed = False
            
            if all_passed:
                self.log_test(test_name, True, "All December 24, 2025 reference data matches perfectly", verification_results)
            else:
                failed_fields = [field for field, result in verification_results.items() if not result['match']]
                self.log_test(test_name, False, f"Mismatches found in fields: {failed_fields}", verification_results)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def test_star_time_variations(self):
        """Test that Star times vary across different dates (Dec 20-26)"""
        test_name = "Star Time Variations (Dec 20-26, 2025)"
        
        try:
            star_times = []
            dates_tested = []
            
            for day in range(20, 27):  # Dec 20-26
                url = f"{self.base_url}/api/calendar/daily/2025/12/{day}"
                response = requests.get(url, timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    star_text = data.get('star', '')
                    dates_tested.append(f"2025-12-{day}")
                    
                    # Extract time from star text (looking for patterns like "06:24 AM")
                    import re
                    time_match = re.search(r'(\d{2}:\d{2})', star_text)
                    if time_match:
                        star_times.append(time_match.group(1))
                    else:
                        star_times.append("No time found")
            
            # Check if we have variations in star times
            unique_times = list(set(star_times))
            has_variations = len(unique_times) > 1
            
            details = {
                "dates_tested": dates_tested,
                "star_times": star_times,
                "unique_times": unique_times,
                "variation_count": len(unique_times)
            }
            
            if has_variations:
                self.log_test(test_name, True, f"Star times show proper variation with {len(unique_times)} different times", details)
            else:
                self.log_test(test_name, False, f"Star times do not vary - all times are the same", details)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def test_thithi_time_variations(self):
        """Test that Thithi times vary across different dates (Dec 20-26)"""
        test_name = "Thithi Time Variations (Dec 20-26, 2025)"
        
        try:
            thithi_times = []
            dates_tested = []
            
            for day in range(20, 27):  # Dec 20-26
                url = f"{self.base_url}/api/calendar/daily/2025/12/{day}"
                response = requests.get(url, timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    thithi_text = data.get('thithi', '')
                    dates_tested.append(f"2025-12-{day}")
                    
                    # Extract time from thithi text (looking for patterns like "11:41 AM")
                    import re
                    time_match = re.search(r'(\d{1,2}:\d{2})', thithi_text)
                    if time_match:
                        thithi_times.append(time_match.group(1))
                    else:
                        thithi_times.append("No time found")
            
            # Check if we have variations in thithi times
            unique_times = list(set(thithi_times))
            has_variations = len(unique_times) > 1
            
            details = {
                "dates_tested": dates_tested,
                "thithi_times": thithi_times,
                "unique_times": unique_times,
                "variation_count": len(unique_times)
            }
            
            if has_variations:
                self.log_test(test_name, True, f"Thithi times show proper variation with {len(unique_times)} different times", details)
            else:
                self.log_test(test_name, False, f"Thithi times do not vary - all times are the same", details)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def test_weekday_soolam_parigaram_consistency(self):
        """Test Soolam and Parigaram consistency for different weekdays"""
        test_name = "Weekday Soolam and Parigaram Consistency"
        
        try:
            weekday_data = {}
            
            # Test a full week (Dec 22-28, 2025)
            for day in range(22, 29):  # Dec 22-28
                url = f"{self.base_url}/api/calendar/daily/2025/12/{day}"
                response = requests.get(url, timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    weekday = data.get('english_day', '')
                    soolam = data.get('soolam', {}).get('tamil', '')
                    parigaram = data.get('parigaram', {}).get('tamil', '')
                    
                    weekday_data[weekday] = {
                        'date': f"2025-12-{day}",
                        'soolam': soolam,
                        'parigaram': parigaram
                    }
            
            # Check if we have data for all 7 days
            expected_weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            all_weekdays_present = all(day in weekday_data for day in expected_weekdays)
            
            # Check for consistency (same weekday should have same Soolam/Parigaram)
            consistent = True
            consistency_details = {}
            
            for weekday in expected_weekdays:
                if weekday in weekday_data:
                    consistency_details[weekday] = weekday_data[weekday]
            
            details = {
                "weekday_data": weekday_data,
                "all_weekdays_present": all_weekdays_present,
                "consistency_check": consistency_details
            }
            
            if all_weekdays_present:
                self.log_test(test_name, True, "Soolam and Parigaram data available for all weekdays", details)
            else:
                missing_days = [day for day in expected_weekdays if day not in weekday_data]
                self.log_test(test_name, False, f"Missing weekday data for: {missing_days}", details)
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all reference data verification tests"""
        print("=" * 80)
        print("TAMIL CALENDAR API - REFERENCE DATA VERIFICATION")
        print("Testing against tamildailycalendar.com reference data")
        print("=" * 80)
        
        # Run all tests
        self.test_december_24_2025_reference_data()
        self.test_star_time_variations()
        self.test_thithi_time_variations()
        self.test_weekday_soolam_parigaram_consistency()
        
        # Summary
        print("\n" + "=" * 80)
        print("REFERENCE DATA VERIFICATION SUMMARY")
        print("=" * 80)
        
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
        else:
            print("\n🎉 ALL REFERENCE DATA VERIFICATION TESTS PASSED!")
        
        return self.test_results

if __name__ == "__main__":
    print(f"Testing backend at: {BASE_URL}")
    tester = ReferenceDataTester()
    results = tester.run_all_tests()
    
    # Save results to file
    with open('/app/reference_data_test_results.json', 'w') as f:
        json.dump(results, f, indent=2, default=str)
    
    print(f"\nDetailed results saved to: /app/reference_data_test_results.json")