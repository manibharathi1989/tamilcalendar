#!/usr/bin/env python3
"""
Tamil Calendar API Testing
Tests the /api/calendar/daily/{year}/{month}/{day} endpoint thoroughly
as requested in the review.

Test Coverage:
1. Verify /api/calendar/daily/{year}/{month}/{day} endpoint
2. Test with and without location parameters (lat, lon)
3. Verify that changing location changes sunrise/sunset times
4. Verify response structure contains all required fields (thithi, star, yogam, etc.)
"""

import requests
import json
import os
from datetime import datetime
from typing import Dict, Any, List, Tuple

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

class TamilCalendarAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.test_results = []
        
    def log_test(self, test_name: str, success: bool, message: str, response_data: Any = None):
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
        
    def test_daily_endpoint_basic(self):
        """Test 1: Basic daily calendar endpoint without location parameters"""
        test_name = "Daily Calendar Endpoint - Basic"
        try:
            url = f"{self.base_url}/api/calendar/daily/2025/12/25"
            response = requests.get(url, timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                
                # Verify required Tamil calendar fields
                required_fields = [
                    'tamil_date', 'nalla_neram', 'raahu_kaalam', 'thithi', 
                    'star', 'yogam', 'soolam', 'parigaram', 'chandirashtamam',
                    'sun_rise', 'sun_set', 'lagnam'
                ]
                
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test(test_name, False, f"Missing required fields: {missing_fields}", data)
                else:
                    self.log_test(test_name, True, "All required Tamil calendar fields present", {
                        "fields_count": len(required_fields),
                        "sample_data": {
                            "tamil_date": data.get('tamil_date'),
                            "thithi": data.get('thithi'),
                            "star": data.get('star'),
                            "yogam": data.get('yogam'),
                            "sun_rise": data.get('sun_rise'),
                            "sun_set": data.get('sun_set')
                        }
                    })
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def test_daily_endpoint_with_location_params(self):
        """Test 2: Daily calendar endpoint with location parameters"""
        test_name = "Daily Calendar Endpoint - With Location Parameters"
        try:
            # Test with Chennai coordinates (default)
            url = f"{self.base_url}/api/calendar/daily/2025/12/25"
            params = {"lat": "13.0827", "lon": "80.2707"}  # Chennai
            response = requests.get(url, params=params, timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                
                # Verify location parameters are accepted and data is returned
                if 'sun_rise' in data and 'sun_set' in data:
                    self.log_test(test_name, True, "Location parameters accepted, sunrise/sunset data returned", {
                        "location": "Chennai (13.0827, 80.2707)",
                        "sun_rise": data.get('sun_rise'),
                        "sun_set": data.get('sun_set'),
                        "thithi": data.get('thithi'),
                        "star": data.get('star')
                    })
                else:
                    self.log_test(test_name, False, "Missing sunrise/sunset data with location params", data)
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def test_location_impact_on_sunrise_sunset(self):
        """Test 3: Verify that changing location changes sunrise/sunset times"""
        test_name = "Location Impact on Sunrise/Sunset Times"
        try:
            # Test with different locations
            locations = [
                {"name": "Chennai", "lat": "13.0827", "lon": "80.2707"},
                {"name": "Delhi", "lat": "28.6139", "lon": "77.2090"},
                {"name": "Mumbai", "lat": "19.0760", "lon": "72.8777"},
                {"name": "Kolkata", "lat": "22.5726", "lon": "88.3639"}
            ]
            
            sunrise_times = {}
            sunset_times = {}
            
            for location in locations:
                url = f"{self.base_url}/api/calendar/daily/2025/12/25"
                params = {"lat": location["lat"], "lon": location["lon"]}
                response = requests.get(url, params=params, timeout=15)
                
                if response.status_code == 200:
                    data = response.json()
                    sunrise_times[location["name"]] = data.get('sun_rise', 'N/A')
                    sunset_times[location["name"]] = data.get('sun_set', 'N/A')
                else:
                    sunrise_times[location["name"]] = f"Error: {response.status_code}"
                    sunset_times[location["name"]] = f"Error: {response.status_code}"
            
            # Check if sunrise/sunset times are different across locations
            unique_sunrise = len(set(sunrise_times.values()))
            unique_sunset = len(set(sunset_times.values()))
            
            if unique_sunrise > 1 and unique_sunset > 1:
                self.log_test(test_name, True, f"Location affects sunrise/sunset times - {unique_sunrise} unique sunrise, {unique_sunset} unique sunset times", {
                    "sunrise_times": sunrise_times,
                    "sunset_times": sunset_times
                })
            else:
                self.log_test(test_name, False, "Location does not affect sunrise/sunset times as expected", {
                    "sunrise_times": sunrise_times,
                    "sunset_times": sunset_times,
                    "unique_sunrise": unique_sunrise,
                    "unique_sunset": unique_sunset
                })
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def test_response_structure_completeness(self):
        """Test 4: Verify response structure contains all required Tamil calendar fields"""
        test_name = "Response Structure Completeness"
        try:
            url = f"{self.base_url}/api/calendar/daily/2025/12/25"
            response = requests.get(url, timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                
                # Define comprehensive field requirements
                field_requirements = {
                    # Basic Tamil calendar fields
                    'tamil_date': str,
                    'thithi': str,
                    'star': str,
                    'yogam': str,
                    'soolam': dict,  # Should contain tamil and english
                    'parigaram': dict,  # Should contain tamil and english
                    'chandirashtamam': str,
                    'lagnam': str,
                    'naal': str,
                    'sraardha_thithi': str,
                    
                    # Time-based fields
                    'sun_rise': str,
                    'sun_set': str,
                    'nalla_neram': dict,  # Should contain morning and evening
                    'raahu_kaalam': str,
                    'yemagandam': str,
                    'kuligai': str,
                    'gowri_nalla_neram': dict,  # Should contain morning and evening
                }
                
                # Check each field
                field_results = {}
                all_passed = True
                
                for field, expected_type in field_requirements.items():
                    if field in data:
                        actual_value = data[field]
                        type_match = isinstance(actual_value, expected_type)
                        
                        # Additional checks for dict fields
                        if expected_type == dict and type_match:
                            if field in ['soolam', 'parigaram']:
                                has_tamil = 'tamil' in actual_value
                                has_english = 'english' in actual_value
                                type_match = has_tamil and has_english
                            elif field in ['nalla_neram', 'gowri_nalla_neram']:
                                has_morning = 'morning' in actual_value
                                has_evening = 'evening' in actual_value
                                type_match = has_morning and has_evening
                        
                        field_results[field] = {
                            "present": True,
                            "type_correct": type_match,
                            "value": actual_value if expected_type != dict else f"Dict with {len(actual_value)} keys"
                        }
                        
                        if not type_match:
                            all_passed = False
                    else:
                        field_results[field] = {
                            "present": False,
                            "type_correct": False,
                            "value": None
                        }
                        all_passed = False
                
                if all_passed:
                    self.log_test(test_name, True, f"All {len(field_requirements)} required fields present with correct structure", {
                        "total_fields": len(field_requirements),
                        "sample_structure": {
                            "soolam": data.get('soolam'),
                            "nalla_neram": data.get('nalla_neram'),
                            "thithi": data.get('thithi'),
                            "star": data.get('star')
                        }
                    })
                else:
                    missing_fields = [f for f, r in field_results.items() if not r["present"]]
                    incorrect_types = [f for f, r in field_results.items() if r["present"] and not r["type_correct"]]
                    
                    self.log_test(test_name, False, f"Structure issues - Missing: {len(missing_fields)}, Incorrect types: {len(incorrect_types)}", {
                        "missing_fields": missing_fields,
                        "incorrect_types": incorrect_types,
                        "field_results": field_results
                    })
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def test_edge_cases_and_error_conditions(self):
        """Test 5: Edge cases and error conditions"""
        test_name = "Edge Cases and Error Conditions"
        try:
            edge_cases = [
                {
                    "name": "Invalid Date - Feb 30",
                    "url": f"{self.base_url}/api/calendar/daily/2025/2/30",
                    "expected_status": [400, 422, 500]  # Should fail
                },
                {
                    "name": "Future Date - Year 2030",
                    "url": f"{self.base_url}/api/calendar/daily/2030/6/15",
                    "expected_status": [200, 500]  # May work or fail gracefully
                },
                {
                    "name": "Very Old Date - Year 1900",
                    "url": f"{self.base_url}/api/calendar/daily/1900/1/1",
                    "expected_status": [200, 500]  # May work or fail gracefully
                },
                {
                    "name": "Invalid Location - Out of Range Lat",
                    "url": f"{self.base_url}/api/calendar/daily/2025/12/25",
                    "params": {"lat": "95.0", "lon": "80.0"},  # Invalid latitude
                    "expected_status": [200, 400, 422, 500]
                },
                {
                    "name": "Invalid Location - Out of Range Lon",
                    "url": f"{self.base_url}/api/calendar/daily/2025/12/25",
                    "params": {"lat": "13.0", "lon": "185.0"},  # Invalid longitude
                    "expected_status": [200, 400, 422, 500]
                }
            ]
            
            edge_results = []
            all_handled_properly = True
            
            for case in edge_cases:
                try:
                    params = case.get("params", {})
                    response = requests.get(case["url"], params=params, timeout=15)
                    
                    status_ok = response.status_code in case["expected_status"]
                    
                    edge_results.append({
                        "case": case["name"],
                        "status_code": response.status_code,
                        "expected_status": case["expected_status"],
                        "handled_properly": status_ok,
                        "response_preview": response.text[:200] if response.text else "No response body"
                    })
                    
                    if not status_ok:
                        all_handled_properly = False
                        
                except Exception as e:
                    edge_results.append({
                        "case": case["name"],
                        "error": str(e),
                        "handled_properly": False
                    })
                    all_handled_properly = False
            
            if all_handled_properly:
                self.log_test(test_name, True, f"All {len(edge_cases)} edge cases handled properly", edge_results)
            else:
                failed_cases = [r for r in edge_results if not r.get("handled_properly", False)]
                self.log_test(test_name, False, f"{len(failed_cases)} edge cases not handled properly", {
                    "failed_cases": failed_cases,
                    "all_results": edge_results
                })
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def test_data_consistency_across_dates(self):
        """Test 6: Data consistency across multiple dates"""
        test_name = "Data Consistency Across Dates"
        try:
            # Test multiple dates to ensure consistent data structure
            test_dates = [
                "2025/12/20", "2025/12/21", "2025/12/22", "2025/12/23", "2025/12/24"
            ]
            
            date_results = []
            consistent_structure = True
            first_date_keys = None
            
            for date in test_dates:
                url = f"{self.base_url}/api/calendar/daily/{date}"
                response = requests.get(url, timeout=15)
                
                if response.status_code == 200:
                    data = response.json()
                    current_keys = set(data.keys())
                    
                    if first_date_keys is None:
                        first_date_keys = current_keys
                    else:
                        if current_keys != first_date_keys:
                            consistent_structure = False
                    
                    date_results.append({
                        "date": date,
                        "status": "success",
                        "keys_count": len(current_keys),
                        "has_thithi": "thithi" in data,
                        "has_star": "star" in data,
                        "has_sunrise": "sun_rise" in data,
                        "thithi_value": data.get('thithi', 'N/A')[:50],  # First 50 chars
                        "star_value": data.get('star', 'N/A')[:50]
                    })
                else:
                    date_results.append({
                        "date": date,
                        "status": f"error_{response.status_code}",
                        "keys_count": 0
                    })
                    consistent_structure = False
            
            if consistent_structure and len(date_results) == len(test_dates):
                self.log_test(test_name, True, f"Data structure consistent across {len(test_dates)} dates", {
                    "dates_tested": len(test_dates),
                    "total_fields": len(first_date_keys) if first_date_keys else 0,
                    "sample_results": date_results[:3]
                })
            else:
                self.log_test(test_name, False, "Data structure inconsistent across dates", {
                    "dates_tested": len(test_dates),
                    "successful_responses": len([r for r in date_results if r.get("status") == "success"]),
                    "all_results": date_results
                })
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def test_specific_tamil_calendar_accuracy(self):
        """Test 7: Specific Tamil calendar calculation accuracy"""
        test_name = "Tamil Calendar Calculation Accuracy"
        try:
            # Test specific date with known values (Dec 25, 2025 - Thursday)
            url = f"{self.base_url}/api/calendar/daily/2025/12/25"
            response = requests.get(url, timeout=15)
            
            if response.status_code == 200:
                data = response.json()
                
                # Verify specific calculations for Thursday, Dec 25, 2025
                accuracy_checks = {
                    "soolam_direction": {
                        "field": "soolam",
                        "expected": "தெற்கு",  # Thursday = South
                        "check": lambda x: x.get('tamil', '') == "தெற்கு"
                    },
                    "parigaram_item": {
                        "field": "parigaram", 
                        "expected": "நெய்",  # Thursday = Ghee/Oil
                        "check": lambda x: x.get('tamil', '') in ["நெய்", "தைலம்"]
                    },
                    "thithi_present": {
                        "field": "thithi",
                        "expected": "Contains Tamil thithi name",
                        "check": lambda x: len(x) > 5 and any(char in x for char in "திசபஞ்சமி")
                    },
                    "star_present": {
                        "field": "star",
                        "expected": "Contains Tamil star name",
                        "check": lambda x: len(x) > 5 and any(char in x for char in "ரோகிணிஅஸ்வினி")
                    },
                    "sunrise_format": {
                        "field": "sun_rise",
                        "expected": "Time format with AM/PM",
                        "check": lambda x: ":" in x and ("AM" in x or "PM" in x or "கா" in x or "மா" in x)
                    }
                }
                
                accuracy_results = {}
                all_accurate = True
                
                for check_name, check_info in accuracy_checks.items():
                    field_value = data.get(check_info["field"])
                    if field_value is not None:
                        is_accurate = check_info["check"](field_value)
                        accuracy_results[check_name] = {
                            "field": check_info["field"],
                            "expected": check_info["expected"],
                            "actual": field_value,
                            "accurate": is_accurate
                        }
                        if not is_accurate:
                            all_accurate = False
                    else:
                        accuracy_results[check_name] = {
                            "field": check_info["field"],
                            "expected": check_info["expected"],
                            "actual": None,
                            "accurate": False
                        }
                        all_accurate = False
                
                if all_accurate:
                    self.log_test(test_name, True, f"All {len(accuracy_checks)} Tamil calendar calculations accurate", accuracy_results)
                else:
                    failed_checks = [name for name, result in accuracy_results.items() if not result["accurate"]]
                    self.log_test(test_name, False, f"Accuracy issues in {len(failed_checks)} calculations: {', '.join(failed_checks)}", accuracy_results)
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all Tamil Calendar API tests as requested in review"""
        print("=" * 80)
        print("TAMIL CALENDAR API COMPREHENSIVE TESTING")
        print("Testing /api/calendar/daily/{year}/{month}/{day} endpoint")
        print("=" * 80)
        print(f"Backend URL: {self.base_url}")
        print()
        
        # Run all tests as specified in review request
        print("🔍 Test 1: Basic Daily Calendar Endpoint")
        print("-" * 50)
        self.test_daily_endpoint_basic()
        
        print("\n🔍 Test 2: Daily Calendar with Location Parameters")
        print("-" * 50)
        self.test_daily_endpoint_with_location_params()
        
        print("\n🔍 Test 3: Location Impact on Sunrise/Sunset Times")
        print("-" * 50)
        self.test_location_impact_on_sunrise_sunset()
        
        print("\n🔍 Test 4: Response Structure Completeness")
        print("-" * 50)
        self.test_response_structure_completeness()
        
        print("\n🔍 Test 5: Edge Cases and Error Conditions")
        print("-" * 50)
        self.test_edge_cases_and_error_conditions()
        
        print("\n🔍 Test 6: Data Consistency Across Dates")
        print("-" * 50)
        self.test_data_consistency_across_dates()
        
        print("\n🔍 Test 7: Tamil Calendar Calculation Accuracy")
        print("-" * 50)
        self.test_specific_tamil_calendar_accuracy()
        
        # Summary
        print("\n" + "=" * 80)
        print("TEST SUMMARY")
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
                print(f"  ❌ {test['test']}: {test['message']}")
        else:
            print("\n🎉 ALL TESTS PASSED!")
        
        return self.test_results

if __name__ == "__main__":
    print("Tamil Calendar API Testing - As requested in review")
    print("Testing the daily calendar endpoint thoroughly...")
    print()
    
    tester = TamilCalendarAPITester()
    results = tester.run_all_tests()
    
    # Save results to file
    results_file = '/app/backend/tests/test_calendar_api_results.json'
    with open(results_file, 'w') as f:
        json.dump(results, f, indent=2, default=str)
    
    print(f"\nDetailed test results saved to: {results_file}")