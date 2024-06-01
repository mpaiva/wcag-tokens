
# Feature: WCAG Search Plugin Filter Functionality

```
As a user of the WCAG Search Plugin,
I want to filter the search results by version and level,
So that I can easily find the relevant WCAG guidelines that match my criteria.

## Scenario: Exploring WCAG

Given the plugin is loaded
And the "Search Guidelines" tab is active
When I click the "Search" button
Then the all available 118 guidelines show as results

## Scenario: Toggling the filter section

Given the results are shown
When I click the "Show Filter" button
Then the filter section is displayed with checkboxes for version and level
And the button text changes to "Hide Filter"
When I click the "Hide Filter" button
Then the filter section is hidden
And the button text changes to "Show Filter"

## Scenario: Default filter settings

Given the filter section is visible
Then the checkboxes for versions 2.0, 2.1, 2.2, and 3.0 are checked
And the checkboxes for levels A, AA, and AAA are checked

## Scenario: Searching for text strings between quotes

Given I entered "user interface" in the search input
When I click the "Search" button
Then the search results are filtered
And only guidelines that contains the "user interface" string are shown

## Scenario: Filtering results by A and AA

Given the filter section is visible
And I have entered "user interface" in the search input
When I uncheck the AAA option
Then the search results are filtered
And only guidelines that contains the "user interface" string for levels A and AA are shown

## Scenario: Filtering results by A

Given the filter section is visible
And I have entered "user interface" in the search input
When I uncheck the AA and AAA options
Then the search results are filtered
And only guidelines that contains the "user interface" string
And level A are shown

## Scenario: Filtering results by version number

Given the filter section is visible
And I have entered "user interface" in the search input
And I have unchecked level AAA option
When I uncheck the 2.2 and 3.0 options
Then the search results are filtered
And searchResultText includes "(Section 508)" after the number of guidelines found
And only guidelines that contains the "user interface" string
And levels A and AA
And versions 2.0 and 2.1 are shown

## Scenario: Showing filter changes badge

Given the filter section is visible
And I have entered "user interface" in the search input
And I have unchecked only the level AAA option
When I click the "Hide Filter" button
Then a badge with the number "1" is displayed next to the "Show Filter" button
When I check the checkbox for level AAA again
And I click the "Hide Filter" button
Then the badge is not displayed next to the "Show Filter" button

## Scenario: Unchecking all filter options

Given the filter section is visible
And I do not have anything entered in the search input
When I uncheck all version checkboxes
And I uncheck all level checkboxes
And I click the "Search" button
Then the search results are filtered
And searchResultText includes "(P.O.U.R principles)" after the number of guidelines found
And only the items not without version and level are shown

```
