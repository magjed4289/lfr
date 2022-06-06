Feature: Forms

    Background:
        Given I am on the form page

    @big-viewport @pt_BR @en_US @this
    Scenario: Sending the form with a valid data
        When I submit the form with a valid data set
        Then I should be informed about my data being processed

    @big-viewport @pt_BR @en_US
    Scenario Outline: Interacting with datepicker - picking the year
        When I go to pick my birthDate to the calendar
        Then I am able to pick the "<year>" correctly

        Examples:
            | year |
            | 2016 |
            | 2006 |
            | 2015 |
            | 2005 |
            | 1996 |
            | 1975 |