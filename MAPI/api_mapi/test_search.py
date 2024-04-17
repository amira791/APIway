# from django.test import TestCase
# from selenium import webdriver
# from selenium.webdriver.edge.options import Options
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.common.exceptions import TimeoutException, StaleElementReferenceException

# import time


# class TestSearchFunctionality(TestCase):
#     @classmethod
#     def setUpClass(cls):
#         super().setUpClass()
#         # Perform any setup needed before the tests in this class are run
#         cls.PATH = "./msedgedriver.exe"

#     def setUp(self):
#         self.driver = webdriver.Edge(options=Options())
#         self.driver.get("http://localhost:3000/searchApi")
#         self.driver.maximize_window()

#     def tearDown(self):
#         self.driver.quit()

#     def test_search_by_name(self):
#         try:
#             # Find the button by its text content "Name"
#             button_element = WebDriverWait(self.driver, 10).until(
#                 EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Name')]"))
#             )

#             # Click on the button
#             button_element.click()

#             # Find the search input field and enter the search term 'Twitter API'
#             search_input = WebDriverWait(self.driver, 10).until(
#                 EC.presence_of_element_located((By.CSS_SELECTOR, 'input.search-bar[placeholder="Search..."]'))
#             )
#             search_input.send_keys('Twitter API')
#             time.sleep(5)

#             # Find and click on the search button
#             search_button = WebDriverWait(self.driver, 10).until(
#                 EC.element_to_be_clickable((By.CLASS_NAME, 'btn-search'))
#             )
#             search_button.click()
#             time.sleep(5)

#             # Wait for the presence of the h1 element
#             h1_element = WebDriverWait(self.driver, 10).until(
#                 EC.presence_of_element_located((By.CLASS_NAME, 'tag'))
#             )

#             # Retrieve text from the h1 element
#             first_h1_text = h1_element.text
#             # Verify the search results by checking the presence of the expected text
#             expected_text = "Twitter API"
#             assert expected_text == first_h1_text, f"Expected text: '{expected_text}', Actual text: '{first_h1_text}'"

#         except TimeoutException:
#             # Handle the case where the element is not found within the timeout
#             self.fail("TimeoutException: Element not found within the specified time")
#         except AssertionError as e:
#             # Handle assertion failures by printing the assertion message
#             self.fail(f"AssertionError: {str(e)}")
    
    
#     def test_search_by_description(self):
#         try:
#             # Find the button by its text content "Name"
#             button_element = WebDriverWait(self.driver, 10).until(
#                 EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Description')]"))
#             )

#             # Click on the button
#             button_element.click()

#             # Find the search input field and enter the search term 'Twitter API'
#             search_input = WebDriverWait(self.driver, 10).until(
#                 EC.presence_of_element_located((By.CSS_SELECTOR, 'input.search-bar[placeholder="Search..."]'))
#             )
#             search_input.send_keys('API for accessing Twitter data and functionality')
#             time.sleep(5)

#             # Find and click on the search button
#             search_button = WebDriverWait(self.driver, 10).until(
#                 EC.element_to_be_clickable((By.CLASS_NAME, 'btn-search'))
#             )
#             search_button.click()
#             time.sleep(5)

#             # Wait for the presence of the h1 element
#             h1_element = WebDriverWait(self.driver, 10).until(
#                 EC.presence_of_element_located((By.CLASS_NAME, 'tag'))
#             )

#             # Retrieve text from the h1 element
#             first_h1_text = h1_element.text
#             # Verify the search results by checking the presence of the expected text
#             expected_text = "Twitter API"
#             assert expected_text == first_h1_text, f"Expected text: '{expected_text}', Actual text: '{first_h1_text}'"

#         except TimeoutException:
#             # Handle the case where the element is not found within the timeout
#             self.fail("TimeoutException: Element not found within the specified time")
#         except AssertionError as e:
#             # Handle assertion failures by printing the assertion message
#             self.fail(f"AssertionError: {str(e)}")



#     def test_search_by_functionalities(self):
#         try:
#             # Find the button by its text content "Name"
#             button_element = WebDriverWait(self.driver, 10).until(
#                 EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Functionalities')]"))
#             )

#             # Click on the button
#             button_element.click()

#             # Find the search input field and enter the search term 'Twitter API'
#             search_input = WebDriverWait(self.driver, 10).until(
#                 EC.presence_of_element_located((By.CSS_SELECTOR, 'input.search-bar[placeholder="Search..."]'))
#             )
#             search_input.send_keys('Search')
#             time.sleep(5)

#             # Find and click on the search button
#             search_button = WebDriverWait(self.driver, 10).until(
#                 EC.element_to_be_clickable((By.CLASS_NAME, 'btn-search'))
#             )
#             search_button.click()
#             time.sleep(5)

#             # Wait for the presence of the h1 element
#             h1_element = WebDriverWait(self.driver, 10).until(
#                 EC.presence_of_element_located((By.CLASS_NAME, 'tag'))
#             )

#             # Retrieve text from the h1 element
#             first_h1_text = h1_element.text
#             # Verify the search results by checking the presence of the expected text
#             expected_text = "cars news"
#             assert expected_text == first_h1_text, f"Expected text: '{expected_text}', Actual text: '{first_h1_text}'"

#         except TimeoutException:
#             # Handle the case where the element is not found within the timeout
#             self.fail("TimeoutException: Element not found within the specified time")
#         except AssertionError as e:
#             # Handle assertion failures by printing the assertion message
#             self.fail(f"AssertionError: {str(e)}")
