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
        return "https://tamildailycal.preview.emergentagent.com"
    return "https://tamildailycal.preview.emergentagent.com"

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
    
    def run_all_tests(self):
        """Run all API tests"""
        print("=" * 60)
        print("TAMIL DAILY CALENDAR - BACKEND API TESTING")
        print("=" * 60)
        
        # Test core endpoints from review request
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