# COVID-Collaborations

## Datasets
* COVID-19 Open Research Dataset Challenge
	* *https://www.kaggle.com/allen-institute-for-ai/CORD-19-research-challenge*
	* 29,000 full text scholarly articles about COVID-19, SARS-CoV-2, and related coronaviruses

* Google Geocode API


## Methods

* walk through all 29,315 articles, and pull out metadata on each

### Find unique institutions (and their location) present in this corpus

* For each author on each article, extract the 'institution' field from the metadata
	*  **Note:** while there are occasionally some `location' subfields in the metadata, these are inconsistently used/formatted, and do not offer a reliable source of location info
* Remove duplicate institutions, yielding a list of unique institutions represented across the articles

* For each institution, use the Google Maps Geocode API to search for an associated address and lat/lng coordinates for n  