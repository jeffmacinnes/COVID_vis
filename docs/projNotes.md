# Data prep steps


## Search Terms
* when the project first started, the PubMed link to the COVID-19 repositiory used this limited search terms:
https://www.ncbi.nlm.nih.gov/pmc/?term=2019-nCoV+OR+2019nCoV+OR+COVID-19+OR+SARS-CoV-2+OR+((wuhan+AND+coronavirus)+AND+2019%2F12%5BPDAT%5D%3A2030%5BPDAT%5D)%20AND%20%22open%20access%22%5BFilter%5D

* sometime thereafter, the link updated to include a new, much expanded search terms
https://www.ncbi.nlm.nih.gov/pmc/?term=%22COVID-19%22%5BAll%20Fields%5D%20OR%20%22COVID-19%22%5BMeSH%20Terms%5D%20OR%20%22COVID-19%20Vaccines%22%5BAll%20Fields%5D%20OR%20%22COVID-19%20Vaccines%22%5BMeSH%20Terms%5D%20OR%20%22COVID-19%20serotherapy%22%5BAll%20Fields%5D%20OR%20%22COVID-19%20Nucleic%20Acid%20Testing%22%5BAll%20Fields%5D%20OR%20%22covid-19%20nucleic%20acid%20testing%22%5BMeSH%20Terms%5D%20OR%20%22COVID-19%20Serological%20Testing%22%5BAll%20Fields%5D%20OR%20%22covid-19%20serological%20testing%22%5BMeSH%20Terms%5D%20OR%20%22COVID-19%20Testing%22%5BAll%20Fields%5D%20OR%20%22covid-19%20testing%22%5BMeSH%20Terms%5D%20OR%20%22SARS-CoV-2%22%5BAll%20Fields%5D%20OR%20%22sars-cov-2%22%5BMeSH%20Terms%5D%20OR%20%22Severe%20Acute%20Respiratory%20Syndrome%20Coronavirus%202%22%5BAll%20Fields%5D%20OR%20%22NCOV%22%5BAll%20Fields%5D%20OR%20%222019%20NCOV%22%5BAll%20Fields%5D%20OR%20((%22coronavirus%22%5BMeSH%20Terms%5D%20OR%20%22coronavirus%22%5BAll%20Fields%5D%20OR%20%22COV%22%5BAll%20Fields%5D)%20AND%202019%2F11%2F01%5BPubDate%5D%20%3A%203000%2F12%2F31%5BPubDate%5D)

* The "papers per year" data was obtained using the expanded search set. 
* On 2/13/21, the collaboration was updated to use this new expanded search set, and the old set of PMCIDs using the previous search set was renamed "covidPMCIDs_orig.csv"




## Processing Steps

### Collaborations Pipeline
Obtaining the list of article metadata for 2020 COVID articles, getting the pubdates for all articles, processing the geolocations of all authors, and building a set of unique geocollaborations across the dataset

### Notebooks
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
	* Create a dataframe of collaborations. Each row represents a unique cross-geo collaboration (any 2 authors from affiliations with unique geo IDs co-authoring a given article)
	* Create a dataframe for unique geoIDs, and indicate the total number of collaborations at that geoID 
	* *End of collaborations pipeline, all output saved to `processed` subfolder*
	

### Citations Pipeline


### Web-site data pipeline

The site design requires a set of specialized (and compressed) datasets. These datasets often are based on the main data processing pipelines above, and can be thought of as a final stage polishing to organize the data in a way best suited to the site. 