# Design

* ancillary data vis:
	* sequence of SARS-COV-19 genome and the paper that released it
	* citation map of articles within this database

* Story:
	* Pull out a few key articles to highlight.
	* Think Macro AND Micro

# Background

###[NYT-Covid-19 changed how the world does science, together](https://www.nytimes.com/2020/04/01/world/europe/coronavirus-science-research-cooperation.html)
* New York Times
* April 1, 2020
* Matt Apuzzo, David. D. Kickpatrick
	>"While political leaders have locked their borders, scientists have been shattering theirs, creating a global collaboration unlike any in history"...

	>On a recent morning, for example, scientists at the University of Pittsburgh discovered that a ferret exposed to Covid-19 particles had developed a high fever — a potential advance toward animal vaccine testing. Under ordinary circumstances, they would have started work on an academic journal article.
	
	>“But you know what? There is going to be plenty of time to get papers published,” said Paul Duprex, a virologist leading the university’s vaccine research. Within two hours, he said, he had shared the findings with scientists around the world on a World Health Organization conference call. “It is pretty cool, right? You cut the crap, for lack of a better word, and you get to be part of a global enterprise.”
	
* Results are being shared via online repositories and conferce calls before an article. 
* Resources (funding, vaccine candidates, clinical trial support) and knowledge are being shared across labs and across national boundaries
* While Chinese officials received a lot of flack for trying to initially cover up knowledge of the outbreak, Chinese scientists have been leading the research front. In January, a chinese lab was the first to publish and share openly the initial viral genome. 



### [Nature-Trials of global research under the coronavirus](https://www.nature.com/articles/d41586-020-02326-0)

* Nature
* Aug 6th, 2020
* Virginia Gewin 

* Covid-19 pandemic is threatening international collaborations because researchers can't meet face-to-face. It "threatens to derail decades of shared scientific progress across many parts of the world" 

### [Consolidation in a crisis: Patterns of international collaboration in early COVID-19 research](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7373281/)

* Research Article
* July 21, 2020
* Paper seeks to understand whether COVID-19 increases or decreases trends in international collaboration
* Methods:
	* Compared resesarch articles collected from Web of Science, Scopus, and PubMedCentral. 
	* compared Coronavirus articles from 24 months prior to Dec 2019, and Coronavirus articles from Jan 1st to April 23rd. 

* Findings:
	* Post covid-19 research had smaller teams and involved fewer nations. 
	* US and China are at the center of most on-going research, and they have increased their collaborative relationships during post COVID-19


### [A completely new culture of doing research](https://www.sciencemag.org/news/2020/02/completely-new-culture-doing-research-coronavirus-outbreak-changes-how-scientists)

* Science Mag
* Feb 26th, 2020
* Kai Kupferschmidt

* With conferences and other venues for international communication shut down, Scientists are shifting to other approaches to communicate
* Data is released on preprint repositories. People debate the merits of the results openly on social media. This is a far cry from the usual, and sloth-like, pace of the peer review process. 
* This has ushered in a new era of collaboration
* But it also ushers in some challenges. Preprints have not undergone peer review, and with the sheer volume of articles coming out, it is tough to ajudicate on methods and results, etc. 

### [China was slammed for initial COVID-19 secrecy, but it's scientists win praise...](https://sciencebusiness.net/covid-19/international-news/china-was-slammed-initial-covid-19-secrecy-its-scientists-led-way)

* Science Business
* April 07, 2020
* Eanna Kelly

* in January, researchers at Shanghai Public Health Clinical Centre & School of Public Health published the viral genome. This was the quickest sequencing effort ever. 
* On the political stage, the Trump administration has been quick to blame everything on China and the WHO. And not for nothing, with some evidence that Chinese leadership attemped to cover up the initial danger. But within the laboratories, Chinese researchers were working overtime to share what they knew and were rapidly learning with the rest of the world.  


# Data prep steps

## 1. getArticles notebook

* The goal of this step is to produce a json file containing the parsed metadata of all articles in the PubMed COVID repository


## 2. preprocessArticles

* The goals of this step are to:
	* append `locID` and `hasGeo` to every location 

	``` 
	'affiliations': [
		{
			'id': 'aff1',
			'address': "Department of What!? New York NY, USA"
			'locID': 'loc0000001',
			'hasGeo': True
		}
	]
	```
	
	* Create database of all *unique* locations across all articles
		* use `libpostal` to parse raw address string into structured address components
		* database should include `original string`, `city`, `state`, `country`, and `hasGeo` fields
	
	* Create a database of geocodes for each unique city in the database
		* for each city in `uniqueLocations` database...
			* check if the city string already exists in the city database?
			* if not, geocode using google. The response will have a `place_id` associated with it. Check if this `place_id` already exists in the city database (i.e. the place already exists under a different name. If not, add a new entry to the city database. 


			

# Notes:


* in a different notebook, run random samples of locations to see how the 'origAddr' corresponds to the proper city. Manually check ~100 (~1000) of them and report stats on accuracy of this approach