# Data prep steps






# Processing Steps

## Collaborations Pipeline
Obtaining the list of article metadata for 2020 COVID articles, getting the pubdates for all articles, processing the geolocations of all authors, and building a set of unique geocollaborations across the dataset

## Notebooks
* `collab_1_getArticles`: 
	* Hit the PMC API to retrieve article metadata for each PMCID.
	* Parse the returned XML to structure the data. 
	* Remove obsolete articles from the master database. 
	* Hit a different Pubmed API to get the publication date data for each PMCID
* `collab_2_processArticles`: 
	* Proces the raw publication date data to make pubDate dataframe
	* Basic cleanup on existing article metadata
	* Process the location information for each author on each article
		* create a database of unique location strings representing all authors across all articles
		* create a city geocode database of unique cities represented across all authors
	* For every unique location string:
		* use libPostal libarry to try to parse the string into addr, city, country components
		* create a search string using city, state, country components. Check if we've already looked up this search string (if so, grab the geoID associated with it)
		* hit the google geocode API with this string. Parse the "locality", "administrative_area_level_1", "coutry", and "geoID" from the response. Check if we've already stored a geoID for this "locality", "adminArea_1" and "country" (if so, use it). 
		* Otherwise, use the "locality" "adminArea_1" and "country" to create a NEW search string that will be used to hit the google geocode API. If the response matches at the "locality" level, parse the full geodata from the response (including the "geoID", "lng" and "lat").
		* Store this as a new unique geoID
	* Go through the article metadata and, for each author location, indicate whether it has an associated geoID or not

* `collab_3_processCollabs`: 
	* Create a dataframe of cross geo collaborations. Each row represents a unique cross-geo collaboration (any 2, uniquely geolocated, institutions affiliated with a given article)
	* Create a dataframe for unique geoIDs, and indicate the total number of collaborations at that geoID 
	* *End of collaborations pipeline, all output saved to `processed` subfolder*
	

## Citations Pipeline


## Web-site data pipeline

The site design requires a set of specialized (and compressed) datasets. These datasets often are based on the main data processing pipelines above, and can be thought of as a final stage polishing to organize the data in a way best suited to the site. 


### General
The main dataset for this project is the set of COVID-related open access articles published on PubMed Central:

https://www.ncbi.nlm.nih.gov/pmc/?term=%22COVID-19%22%5BAll%20Fields%5D%20OR%20%22COVID-19%22%5BMeSH%20Terms%5D%20OR%20%22COVID-19%20Vaccines%22%5BAll%20Fields%5D%20OR%20%22COVID-19%20Vaccines%22%5BMeSH%20Terms%5D%20OR%20%22COVID-19%20serotherapy%22%5BAll%20Fields%5D%20OR%20%22COVID-19%20Nucleic%20Acid%20Testing%22%5BAll%20Fields%5D%20OR%20%22covid-19%20nucleic%20acid%20testing%22%5BMeSH%20Terms%5D%20OR%20%22COVID-19%20Serological%20Testing%22%5BAll%20Fields%5D%20OR%20%22covid-19%20serological%20testing%22%5BMeSH%20Terms%5D%20OR%20%22COVID-19%20Testing%22%5BAll%20Fields%5D%20OR%20%22covid-19%20testing%22%5BMeSH%20Terms%5D%20OR%20%22SARS-CoV-2%22%5BAll%20Fields%5D%20OR%20%22sars-cov-2%22%5BMeSH%20Terms%5D%20OR%20%22Severe%20Acute%20Respiratory%20Syndrome%20Coronavirus%202%22%5BAll%20Fields%5D%20OR%20%22NCOV%22%5BAll%20Fields%5D%20OR%20%222019%20NCOV%22%5BAll%20Fields%5D%20OR%20((%22coronavirus%22%5BMeSH%20Terms%5D%20OR%20%22coronavirus%22%5BAll%20Fields%5D%20OR%20%22COV%22%5BAll%20Fields%5D)%20AND%202019%2F11%2F01%5BPubDate%5D%20%3A%203000%2F12%2F31%5BPubDate%5D)

This dataset resulted from the search string: 
```
"COVID-19"[All Fields] OR "COVID-19"[MeSH Terms] OR "COVID-19 Vaccines"[All Fields] OR "COVID-19 Vaccines"[MeSH Terms] OR "COVID-19 serotherapy"[All Fields] OR "COVID-19 Nucleic Acid Testing"[All Fields] OR "covid-19 nucleic acid testing"[MeSH Terms] OR "COVID-19 Serological Testing"[All Fields] OR "covid-19 serological testing"[MeSH Terms] OR "COVID-19 Testing"[All Fields] OR "covid-19 testing"[MeSH Terms] OR "SARS-CoV-2"[All Fields] OR "sars-cov-2"[MeSH Terms] OR "Severe Acute Respiratory Syndrome Coronavirus 2"[All Fields] OR "NCOV"[All Fields] OR "2019 NCOV"[All Fields] OR (("coronavirus"[MeSH Terms] OR "coronavirus"[All Fields] OR "COV"[All Fields]) AND 2019/11/01[PubDate] : 3000/12/31[PubDate]) 
```


### Hero Data

The list of titles used to generate the hero datavis was obtained by taking a random sample of 1000 titles from the full articles database `data/articleMetadata.json`

### Papers-per-Year

The `papersPerYear.csv` was obtained by going to pubmed central and using the covid-19 search string, without the publication date range:

```
"COVID-19"[All Fields] OR "COVID-19"[MeSH Terms] OR "COVID-19 Vaccines"[All Fields] OR "COVID-19 Vaccines"[MeSH Terms] OR "COVID-19 serotherapy"[All Fields] OR "COVID-19 Nucleic Acid Testing"[All Fields] OR "covid-19 nucleic acid testing"[MeSH Terms] OR "COVID-19 Serological Testing"[All Fields] OR "covid-19 serological testing"[MeSH Terms] OR "COVID-19 Testing"[All Fields] OR "covid-19 testing"[MeSH Terms] OR "SARS-CoV-2"[All Fields] OR "sars-cov-2"[MeSH Terms] OR "Severe Acute Respiratory Syndrome Coronavirus 2"[All Fields] OR "NCOV"[All Fields] OR "2019 NCOV"[All Fields] OR (("coronavirus"[MeSH Terms] OR "coronavirus"[All Fields] OR "COV"[All Fields]) ) 
```

Next, using the returned results, I applied a custom filter (using the left hand panel) to define a date range for each year from 1965 onwards. For instance, 1965 was setting the custom date range to `1965/01/01` to `1965/12/31`. 

I manually recorded the number of articles returned by this filter. Repeated for every year thereafter. 




# Appendix
## Pubmed search string
* when the project first started, the PubMed link to the COVID-19 repositiory used this limited search terms:
https://www.ncbi.nlm.nih.gov/pmc/?term=2019-nCoV+OR+2019nCoV+OR+COVID-19+OR+SARS-CoV-2+OR+((wuhan+AND+coronavirus)+AND+2019%2F12%5BPDAT%5D%3A2030%5BPDAT%5D)%20AND%20%22open%20access%22%5BFilter%5D

* sometime thereafter, the link updated to include a new, much expanded search terms
https://www.ncbi.nlm.nih.gov/pmc/?term=%22COVID-19%22%5BAll%20Fields%5D%20OR%20%22COVID-19%22%5BMeSH%20Terms%5D%20OR%20%22COVID-19%20Vaccines%22%5BAll%20Fields%5D%20OR%20%22COVID-19%20Vaccines%22%5BMeSH%20Terms%5D%20OR%20%22COVID-19%20serotherapy%22%5BAll%20Fields%5D%20OR%20%22COVID-19%20Nucleic%20Acid%20Testing%22%5BAll%20Fields%5D%20OR%20%22covid-19%20nucleic%20acid%20testing%22%5BMeSH%20Terms%5D%20OR%20%22COVID-19%20Serological%20Testing%22%5BAll%20Fields%5D%20OR%20%22covid-19%20serological%20testing%22%5BMeSH%20Terms%5D%20OR%20%22COVID-19%20Testing%22%5BAll%20Fields%5D%20OR%20%22covid-19%20testing%22%5BMeSH%20Terms%5D%20OR%20%22SARS-CoV-2%22%5BAll%20Fields%5D%20OR%20%22sars-cov-2%22%5BMeSH%20Terms%5D%20OR%20%22Severe%20Acute%20Respiratory%20Syndrome%20Coronavirus%202%22%5BAll%20Fields%5D%20OR%20%22NCOV%22%5BAll%20Fields%5D%20OR%20%222019%20NCOV%22%5BAll%20Fields%5D%20OR%20((%22coronavirus%22%5BMeSH%20Terms%5D%20OR%20%22coronavirus%22%5BAll%20Fields%5D%20OR%20%22COV%22%5BAll%20Fields%5D)%20AND%202019%2F11%2F01%5BPubDate%5D%20%3A%203000%2F12%2F31%5BPubDate%5D)

* The "papers per year" data for the website was obtained using the expanded search set. 
* On 2/13/21, the collaboration was updated to use this new expanded search set, and the old set of PMCIDs using the previous search set was renamed "covidPMCIDs_orig.csv"

## Limitations
* The cross geo collaborations are based *only* on the list of affiliations present on any given article, and do not take into account the which authors are affiliation with which location. This is because the raw XML of article metadata returned from Pubmed was not always consistent in how author affiliations were listed, and despite having the full list of affiliation locations, it was not always clear which authors were associated with each affiation. 
	* As a potential consequence, if an author has 2 or more affiliations, AND those affiliations are uniquely geolocated (i.e. different cities), they will be recorded as a collaboration. Whether or not this is seen as a problem will depend on how the collaborations are defined. If collaborations are defined as between individuals, this presents a problem (the same person would be collaborating with themselves at different locations). However, if collaborations are defined as institutions (or cities) working together, then it could be argued this is actually the more accurate way to present the data, since even though it is the same author, resources from both (all) institutions are collaborating to contribute to the article. At any rate, the number of articles with authors susceptible to this problem is rare. 

* The cross geo collaborations also do not show collaborations that occur within the same geolocation (hence, cross-geo). 
