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

All citation data was obtained using the Pubmed APIs here https://www.ncbi.nlm.nih.gov/pmc/tools/cites-citedby/

The notebook `cite_1_getCitations` retrieves citation data for each article in the dataset and stores it in the file `articleCitations.json`. The citations are taken from the `PMC` database, and not the `PubMed`. For each article, this file contains:

* `nCitations`: the number of PMC citations in the current article
* `nCitations_covid`: of the total citations, the number of citations that are from the set of covid articles used in this project.
* `citations`: list of PMCIDs of every citation
* `citations_covid`: list of PMCIDs for the citations that are from the set of covid articles used in this project
* `nCitedBy`: the number of subsequent articles that cited the current article
* `nCitedBy_covid`: the number of subsequent articles from the set of covid articles used in this project that cited the current article  
* `citedBy`: list of PMCIDs of all subsequent articles that cited the current article
* `citedBy_covid`: list of PMCIDs of articles  from the set of covid articles used in this project that cited the current article

Ultimately, this data didn't make it to the website, but is still there for reference. 

For the website, we changed the search to use the `Pubmed database` instead of the `PMC database` so that it would more representative of the true citations in the article (there are more papers in the Pubmed database than the PMC one).

See below for more information on how the website citation data was obtained.  


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

###  Section 1 - 2020 Articles Overview

#### papers per year plot:
The `papersPerYear.csv` was obtained by going to **pubmed central** and using the search string `"coronavirus"[MeSH Terms] OR "coronavirus"[All Fields] OR "COV"[All Fields]` and then applying a custom filter (using the left hand panel) to define a date range. I did this for every year from 1980-onwards. 

*NOTE:* I used this shortened search string -- looking for `coronavirus` related papers only -- instead of the larger search string used for the full set of 2020 papers because the larger search string would artificially inflate the number of papers in 2020 compared to prior years. That larger search string includes things like "COVID-19" which obviously wasn't around prior to 2019. This ensures a fairer representation in the papers-per-year plot, but necessitates a little more explanation about how the larger 2020 dataset is different. 

*NOTE:* For the sake of completeness, I ran the same query by year at **PubMed** (instead of PMC). These data are included as a separate column in the `papersPerYear.csv` table (the pattern is largely the same).  


#### 2020 article stats:
* *93,593 articles in 2020*: the number of **VALID** PMCIDs returned using the search string above on **pubmed central** and filtering to restrict to 2020 only. There were 96,625 articles total, but was unable to scrap ~3k for some reason or another. 
* *203 countries*: Number of unique countries found in geocoded article metadata for the set of 93,593 articles above
* *11 articles per hour*: 93,593 articles / 366 days (leap year) / 24 hours
* *6799 journals*: Number of unique journals found in article metadata for the set of 93,593 articles above

*  *comparisons against all other papers in PMC* (for context)
	* from this site https://www.ncbi.nlm.nih.gov/pmc/about/intro/ we can calculate the number of new articles added to PMC each fiscal year (Oct-Sep). There were **745,357** articles added in 2020; **618,229** in 2019. Given that these are fiscal years, not calendar years, these stats should be talked about as approximations
	* In 2020, there were 79,433 "coronavirus" articles (from `papersPerYear.csv`), or 10.6% of the 745,357 2020 papers. ~1 out of every 10 papers. 
	* In 2019, there were 4,782 "coronavirus" articles, or 0.77% of the 618,229 articles. ~1 out of every 130 articles. 


### Section II - Collaboration Map
The data for the collaboration map was prepared for the web using the collaboration data collected and geocoded via the pipeline described in detail here: https://github.com/jeffmacinnes/COVID_vis

The set of collaborations and geoIDs datasets were stripped of superflous data fields and compressed to make as small as possible for the web. 

The total number of authors by day was calculated by summing the number of authors on each article from Jan 1st 2020 to the current date. 

The total collaborations by day was calculated by summing the number of collaborations per article for each article from Jan 1st 2020 to the current date. The number of unique pairwise collaborations between authors was calculated as: `nAuths * (nAuths-1) / 2`


### Section III - Citation Graph

The citation network plot data was obtained using the Pubmed citation database, accessed via the APIs here: https://www.ncbi.nlm.nih.gov/pmc/tools/cites-citedby/

This data is accurate as of March 2nd 2021. 

The data for each stage of the plot:

* We pulled the PMIDs of every article that was cited by the Moderna and Pfizer vaccine safety and efficacy papers published in Dec 2020. These are 1st deg citations. 

* For each of those articles, we next pulled the PMIDs of every article cited within the 1st deg citation. These are 2nd deg citations. 

* For the full set of articles (vax articles, 1st deg citations, 2nd deg citations), we used the cited-by API to get the number of subsequent articles that cited each article. 

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
