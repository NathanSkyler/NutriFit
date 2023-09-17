import requests
import os

def get_restaurants_api(latitude, longitude):
    
    api_key = os.environ.get('apiKeyYelp')

    print(api_key)

    url= "https://api.yelp.com/v3/businesses/search"

    
    headers = {
        'Authorization': f'Bearer {api_key}'
    }

    payload = {
        'latitude': latitude,
        'longitude': longitude,
        'term': "healthy food"
    }

    response = requests.get(url, headers=headers, params=payload)
    response = response.json()

    return response


def format_yelp_results(api_response):
    formatted_results = []
    id = 1

    for result in api_response["businesses"]:
        name = result["name"]
        image_url = result["image_url"]
        url = result["url"]
        rating = result["rating"]
        categories = [category["title"] for category in result["categories"]]
        address = " ".join(result["location"]["display_address"])
        latitude = result["coordinates"]["latitude"]
        longitude = result["coordinates"]["longitude"]
        

        formatted_result = {
            "Id": id,
            "Name": name,
            "ImageUrl": image_url,
            "url": url,
            "Rating": rating,
            "Categories": categories,
            "Address": address,
            "latitude": latitude,
            "longitude": longitude,
        }

        formatted_results.append(formatted_result)
        id +=1

    return formatted_results
    