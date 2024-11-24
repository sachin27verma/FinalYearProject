import requests
from bs4 import BeautifulSoup
import pandas as pd
from requests.packages.urllib3.exceptions import InsecureRequestWarning

# Suppress SSL warnings
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

# Load URLs from the CSV file
df = pd.read_csv('data copy.csv')
urls = df['link'].tolist()  # Assuming the column is named 'link'

def scrape_article(url):
    try:
        # Make a request with a timeout and SSL verification disabled
        response = requests.get(url, verify=False, timeout=10)
        
        # Check if the request was successful (status code 200)
        if response.status_code != 200:
            print(f"Failed to fetch {url} with status code {response.status_code}")
            return None

        # Parse the response content
        soup = BeautifulSoup(response.content, 'html.parser')
        title = soup.find('h1').get_text() if soup.find('h1') else "No Title"
        date = soup.find('div', class_='publish-date').get_text() if soup.find('div', class_='publish-date') else "No Date"
        content = ' '.join([p.get_text() for p in soup.find_all('p')])

        return {
            'title': title,
            'date': date,
            'content': content,
            'url': url
        }
    
    # Handle different types of exceptions
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None

# Lists to store successful and failed scrapes
articles = []
failed_urls = []

# Scrape each URL
for url in urls:
    print(f"Scraping URL: {url}")
    article = scrape_article(url)
    
    if article:
        articles.append(article)
    else:
        failed_urls.append(url)

# Save successful results to a CSV file
output_df = pd.DataFrame(articles)
output_df.to_csv('scraped_data.csv', index=False, encoding='utf-8')
print("Scraping complete! Data saved to scraped_data.csv")

# Save failed URLs to a separate CSV file
if failed_urls:
    failed_df = pd.DataFrame(failed_urls, columns=['url'])
    failed_df.to_csv('failed_urls.csv', index=False)
    print("Some URLs failed to scrape. Check failed_urls.csv for details.")
