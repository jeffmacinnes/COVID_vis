# Methods
Methods for how the data were obtained for each section of the site


## General
The main dataset for this project is the set of COVID-related open access articles published on PubMed Central:

https://www.ncbi.nlm.nih.gov/pmc/?term=%22COVID-19%22%5BAll%20Fields%5D%20OR%20%22COVID-19%22%5BMeSH%20Terms%5D%20OR%20%22COVID-19%20Vaccines%22%5BAll%20Fields%5D%20OR%20%22COVID-19%20Vaccines%22%5BMeSH%20Terms%5D%20OR%20%22COVID-19%20serotherapy%22%5BAll%20Fields%5D%20OR%20%22COVID-19%20Nucleic%20Acid%20Testing%22%5BAll%20Fields%5D%20OR%20%22covid-19%20nucleic%20acid%20testing%22%5BMeSH%20Terms%5D%20OR%20%22COVID-19%20Serological%20Testing%22%5BAll%20Fields%5D%20OR%20%22covid-19%20serological%20testing%22%5BMeSH%20Terms%5D%20OR%20%22COVID-19%20Testing%22%5BAll%20Fields%5D%20OR%20%22covid-19%20testing%22%5BMeSH%20Terms%5D%20OR%20%22SARS-CoV-2%22%5BAll%20Fields%5D%20OR%20%22sars-cov-2%22%5BMeSH%20Terms%5D%20OR%20%22Severe%20Acute%20Respiratory%20Syndrome%20Coronavirus%202%22%5BAll%20Fields%5D%20OR%20%22NCOV%22%5BAll%20Fields%5D%20OR%20%222019%20NCOV%22%5BAll%20Fields%5D%20OR%20((%22coronavirus%22%5BMeSH%20Terms%5D%20OR%20%22coronavirus%22%5BAll%20Fields%5D%20OR%20%22COV%22%5BAll%20Fields%5D)%20AND%202019%2F11%2F01%5BPubDate%5D%20%3A%203000%2F12%2F31%5BPubDate%5D)

This dataset resulted from the search string: 
```
"COVID-19"[All Fields] OR "COVID-19"[MeSH Terms] OR "COVID-19 Vaccines"[All Fields] OR "COVID-19 Vaccines"[MeSH Terms] OR "COVID-19 serotherapy"[All Fields] OR "COVID-19 Nucleic Acid Testing"[All Fields] OR "covid-19 nucleic acid testing"[MeSH Terms] OR "COVID-19 Serological Testing"[All Fields] OR "covid-19 serological testing"[MeSH Terms] OR "COVID-19 Testing"[All Fields] OR "covid-19 testing"[MeSH Terms] OR "SARS-CoV-2"[All Fields] OR "sars-cov-2"[MeSH Terms] OR "Severe Acute Respiratory Syndrome Coronavirus 2"[All Fields] OR "NCOV"[All Fields] OR "2019 NCOV"[All Fields] OR (("coronavirus"[MeSH Terms] OR "coronavirus"[All Fields] OR "COV"[All Fields]) AND 2019/11/01[PubDate] : 3000/12/31[PubDate]) 
```


## Hero Data

The list of titles used to generate the hero datavis was obtained by taking a random sample of 1000 titles from the full articles database `data/articleMetadata.json`

## Papers-per-Year

The `papersPerYear.csv` was obtained by going to pubmed central and using the covid-19 search string, without the publication date range:

```
"COVID-19"[All Fields] OR "COVID-19"[MeSH Terms] OR "COVID-19 Vaccines"[All Fields] OR "COVID-19 Vaccines"[MeSH Terms] OR "COVID-19 serotherapy"[All Fields] OR "COVID-19 Nucleic Acid Testing"[All Fields] OR "covid-19 nucleic acid testing"[MeSH Terms] OR "COVID-19 Serological Testing"[All Fields] OR "covid-19 serological testing"[MeSH Terms] OR "COVID-19 Testing"[All Fields] OR "covid-19 testing"[MeSH Terms] OR "SARS-CoV-2"[All Fields] OR "sars-cov-2"[MeSH Terms] OR "Severe Acute Respiratory Syndrome Coronavirus 2"[All Fields] OR "NCOV"[All Fields] OR "2019 NCOV"[All Fields] OR (("coronavirus"[MeSH Terms] OR "coronavirus"[All Fields] OR "COV"[All Fields]) ) 
```

Next, using the returned results, I applied a custom filter (using the left hand panel) to define a date range for each year from 1965 onwards. For instance, 1965 was setting the custom date range to `1965/01/01` to `1965/12/31`. 

I manually recorded the number of articles returned by this filter. Repeated for every year thereafter. 

