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
        return "https://astro-planner-1.preview.emergentagent.com"
    return "https://astro-planner-1.preview.emergentagent.com"

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

    def test_january_1_2026_specific_rules(self):
        """Test January 1, 2026 (Thursday) - All 10 Features per user's calculation rules"""
        test_name = "January 1, 2026 - User's Calculation Rules"
        
        try:
            url = f"{self.base_url}/api/calendar/daily/2026/1/1"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Expected values per user's calculation rules
                expected_values = {
                    "soolam": "தெற்கு",  # Thursday = South
                    "parigaram": "தைலம்",  # Thu = Oil
                    "chandirashtamam": "துலாம் - பரணி, கிருத்திகை",  # Thula Rasi with stars
                    "naal": "மேல் நோக்கு நாள்",  # Rohini is Mel Nokku star
                    "lagnam": "தனுசு",  # Margazhi month = Dhanushu
                    "sun_rise": "06:30 கா / AM",  # Sun Rise
                    "sraardha_thithi": "திரயோதசி",  # Trayodashi
                    "thithi_contains": "திரயோதசி",  # Contains Trayodashi till 05:54 PM
                    "star_contains": "ரோகிணி",  # Contains Rohini till 10:48 PM
                    "yogam": "மரண யோகம்"  # Thu + Rohini = Marana Yogam
                }
                
                # Check each expected value
                test_results = {}
                all_passed = True
                
                # 1. Soolam
                actual_soolam = data.get('soolam', {}).get('tamil', '')
                soolam_pass = actual_soolam == expected_values["soolam"]
                test_results["soolam"] = {
                    "expected": expected_values["soolam"],
                    "actual": actual_soolam,
                    "pass": soolam_pass
                }
                if not soolam_pass:
                    all_passed = False
                
                # 2. Parigaram
                actual_parigaram = data.get('parigaram', {}).get('tamil', '')
                parigaram_pass = actual_parigaram == expected_values["parigaram"]
                test_results["parigaram"] = {
                    "expected": expected_values["parigaram"],
                    "actual": actual_parigaram,
                    "pass": parigaram_pass
                }
                if not parigaram_pass:
                    all_passed = False
                
                # 3. Chandirashtamam
                actual_chandirashtamam = data.get('chandirashtamam', '')
                chandirashtamam_pass = actual_chandirashtamam == expected_values["chandirashtamam"]
                test_results["chandirashtamam"] = {
                    "expected": expected_values["chandirashtamam"],
                    "actual": actual_chandirashtamam,
                    "pass": chandirashtamam_pass
                }
                if not chandirashtamam_pass:
                    all_passed = False
                
                # 4. Naal
                actual_naal = data.get('naal', '')
                naal_pass = actual_naal == expected_values["naal"]
                test_results["naal"] = {
                    "expected": expected_values["naal"],
                    "actual": actual_naal,
                    "pass": naal_pass
                }
                if not naal_pass:
                    all_passed = False
                
                # 5. Lagnam (check if contains Dhanushu)
                actual_lagnam = data.get('lagnam', '')
                lagnam_pass = expected_values["lagnam"] in actual_lagnam
                test_results["lagnam"] = {
                    "expected": f"Contains {expected_values['lagnam']}",
                    "actual": actual_lagnam,
                    "pass": lagnam_pass
                }
                if not lagnam_pass:
                    all_passed = False
                
                # 6. Sun Rise
                actual_sunrise = data.get('sun_rise', '')
                sunrise_pass = actual_sunrise == expected_values["sun_rise"]
                test_results["sun_rise"] = {
                    "expected": expected_values["sun_rise"],
                    "actual": actual_sunrise,
                    "pass": sunrise_pass
                }
                if not sunrise_pass:
                    all_passed = False
                
                # 7. Sraardha Thithi
                actual_sraardha = data.get('sraardha_thithi', '')
                sraardha_pass = actual_sraardha == expected_values["sraardha_thithi"]
                test_results["sraardha_thithi"] = {
                    "expected": expected_values["sraardha_thithi"],
                    "actual": actual_sraardha,
                    "pass": sraardha_pass
                }
                if not sraardha_pass:
                    all_passed = False
                
                # 8. Thithi (check if contains Trayodashi)
                actual_thithi = data.get('thithi', '')
                thithi_pass = expected_values["thithi_contains"] in actual_thithi
                test_results["thithi"] = {
                    "expected": f"Contains {expected_values['thithi_contains']}",
                    "actual": actual_thithi,
                    "pass": thithi_pass
                }
                if not thithi_pass:
                    all_passed = False
                
                # 9. Star (check if contains Rohini)
                actual_star = data.get('star', '')
                star_pass = expected_values["star_contains"] in actual_star
                test_results["star"] = {
                    "expected": f"Contains {expected_values['star_contains']}",
                    "actual": actual_star,
                    "pass": star_pass
                }
                if not star_pass:
                    all_passed = False
                
                # 10. Yogam (check for Marana Yogam)
                actual_yogam = data.get('yogam', '')
                yogam_pass = expected_values["yogam"] in actual_yogam
                test_results["yogam"] = {
                    "expected": expected_values["yogam"],
                    "actual": actual_yogam,
                    "pass": yogam_pass
                }
                if not yogam_pass:
                    all_passed = False
                
                if all_passed:
                    self.log_test(test_name, True, "All 10 calculation rules match user's expected values exactly", test_results)
                else:
                    failed_features = [k for k, v in test_results.items() if not v["pass"]]
                    self.log_test(test_name, False, f"Mismatch in {len(failed_features)} features: {', '.join(failed_features)}", test_results)
                    
            else:
                self.log_test(test_name, False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test(test_name, False, f"Exception: {str(e)}")
    
    def test_weekday_soolam_pattern_jan_2026(self):
        """Test Weekday-based Soolam Pattern (Jan 1-7, 2026)"""
        test_name = "Weekday Soolam Pattern Jan 1-7, 2026"
        
        # Expected Soolam directions per user's rules
        expected_soolam = {
            "2026-01-01": {"weekday": "Thursday", "soolam": "தெற்கு"},    # South
            "2026-01-02": {"weekday": "Friday", "soolam": "மேற்கு"},      # West
            "2026-01-03": {"weekday": "Saturday", "soolam": "கிழக்கு"},   # East
            "2026-01-04": {"weekday": "Sunday", "soolam": "மேற்கு"},      # West
            "2026-01-05": {"weekday": "Monday", "soolam": "கிழக்கு"},     # East
            "2026-01-06": {"weekday": "Tuesday", "soolam": "வடக்கு"},     # North
            "2026-01-07": {"weekday": "Wednesday", "soolam": "வடக்கு"}    # North
        }
        
        all_passed = True
        results = []
        
        for date_str, expected in expected_soolam.items():
            try:
                year, month, day = date_str.split("-")
                url = f"{self.base_url}/api/calendar/daily/{year}/{month}/{day}"
                response = requests.get(url, timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    actual_soolam = data.get('soolam', {}).get('tamil', '')
                    expected_soolam_val = expected["soolam"]
                    
                    soolam_match = actual_soolam == expected_soolam_val
                    
                    result = {
                        "date": date_str,
                        "weekday": expected["weekday"],
                        "expected_soolam": expected_soolam_val,
                        "actual_soolam": actual_soolam,
                        "pass": soolam_match
                    }
                    
                    results.append(result)
                    
                    if not soolam_match:
                        all_passed = False
                        
                else:
                    all_passed = False
                    results.append({
                        "date": date_str,
                        "error": f"HTTP {response.status_code}: {response.text}"
                    })
                    
            except Exception as e:
                all_passed = False
                results.append({
                    "date": date_str,
                    "error": f"Exception: {str(e)}"
                })
        
        if all_passed:
            self.log_test(test_name, True, "All weekday Soolam patterns match user's rules", results)
        else:
            failed_dates = [r for r in results if not r.get('pass', False)]
            self.log_test(test_name, False, f"Soolam pattern mismatch in {len(failed_dates)} dates", {
                "failed_dates": failed_dates,
                "all_results": results
            })
    
    def test_parigaram_based_on_soolam(self):
        """Test Parigaram based on Soolam direction per user's rules"""
        test_name = "Parigaram Based on Soolam Direction"
        
        # User's rules: Mon/Sat = Milk, Tue/Wed = Jaggery/Rice, Sun/Thu/Fri = Oil
        test_dates = [
            {"date": "2026-01-05", "weekday": "Monday", "expected_parigaram": "பால்"},      # Mon = Milk
            {"date": "2026-01-03", "weekday": "Saturday", "expected_parigaram": "பால்"},    # Sat = Milk
            {"date": "2026-01-06", "weekday": "Tuesday", "expected_parigaram": "வெல்லம்"},   # Tue = Jaggery
            {"date": "2026-01-07", "weekday": "Wednesday", "expected_parigaram": "அரிசி"},   # Wed = Rice
            {"date": "2026-01-04", "weekday": "Sunday", "expected_parigaram": "தைலம்"},     # Sun = Oil
            {"date": "2026-01-01", "weekday": "Thursday", "expected_parigaram": "தைலம்"},   # Thu = Oil
            {"date": "2026-01-02", "weekday": "Friday", "expected_parigaram": "தைலம்"}      # Fri = Oil
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
                    actual_parigaram = data.get('parigaram', {}).get('tamil', '')
                    expected_parigaram = test_case["expected_parigaram"]
                    
                    parigaram_match = actual_parigaram == expected_parigaram
                    
                    result = {
                        "date": test_case["date"],
                        "weekday": test_case["weekday"],
                        "expected_parigaram": expected_parigaram,
                        "actual_parigaram": actual_parigaram,
                        "pass": parigaram_match
                    }
                    
                    results.append(result)
                    
                    if not parigaram_match:
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
            self.log_test(test_name, True, "All Parigaram calculations based on Soolam direction match user's rules", results)
        else:
            failed_dates = [r for r in results if not r.get('pass', False)]
            self.log_test(test_name, False, f"Parigaram mismatch in {len(failed_dates)} dates", {
                "failed_dates": failed_dates,
                "all_results": results
            })
    
    def test_special_yogam_day_star_combinations(self):
        """Test Special Yogam - Day + Star combinations"""
        test_name = "Special Yogam Day+Star Combinations"
        
        # Test specific combinations from user's rules
        test_combinations = [
            {
                "date": "2026-01-01",  # Thursday + Rohini = Marana Yogam
                "weekday": "Thursday",
                "expected_star": "ரோகிணி",
                "expected_yogam": "மரண யோகம்",
                "description": "Thursday + Rohini = Marana Yogam"
            }
            # Note: We can add more test cases for Tuesday + Ashwini = Amrita Yogam when we have such dates
        ]
        
        all_passed = True
        results = []
        
        for test_case in test_combinations:
            try:
                date_parts = test_case["date"].split("-")
                year, month, day = int(date_parts[0]), int(date_parts[1]), int(date_parts[2])
                
                url = f"{self.base_url}/api/calendar/daily/{year}/{month}/{day}"
                response = requests.get(url, timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    actual_star = data.get('star', '')
                    actual_yogam = data.get('yogam', '')
                    
                    # Check if star contains expected star
                    star_match = test_case["expected_star"] in actual_star
                    
                    # Check if yogam contains expected yogam
                    yogam_match = test_case["expected_yogam"] in actual_yogam
                    
                    overall_pass = star_match and yogam_match
                    
                    result = {
                        "date": test_case["date"],
                        "weekday": test_case["weekday"],
                        "description": test_case["description"],
                        "expected_star": test_case["expected_star"],
                        "actual_star": actual_star,
                        "star_match": star_match,
                        "expected_yogam": test_case["expected_yogam"],
                        "actual_yogam": actual_yogam,
                        "yogam_match": yogam_match,
                        "overall_pass": overall_pass
                    }
                    
                    results.append(result)
                    
                    if not overall_pass:
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
            self.log_test(test_name, True, "All special Day+Star Yogam combinations match user's rules", results)
        else:
            failed_combinations = [r for r in results if not r.get('overall_pass', False)]
            self.log_test(test_name, False, f"Special Yogam mismatch in {len(failed_combinations)} combinations", {
                "failed_combinations": failed_combinations,
                "all_results": results
            })

    def run_all_tests(self):
        """Run all API tests"""
        print("=" * 60)
        print("TAMIL DAILY CALENDAR - BACKEND API TESTING")
        print("=" * 60)
        
        # Test specific requirements from review request - January 1, 2026 User's Rules
        print("\n🔍 TESTING JANUARY 1, 2026 USER'S CALCULATION RULES")
        print("-" * 60)
        self.test_january_1_2026_specific_rules()
        self.test_weekday_soolam_pattern_jan_2026()
        self.test_parigaram_based_on_soolam()
        self.test_special_yogam_day_star_combinations()
        
        # Test existing requirements
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