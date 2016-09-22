import React, { Component } from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

var data = {
    weekDateRangeLabel: "20-27.09.2016",
    weekDays: [{
        day: "09",
        month: "05",
        year: "2016",
        statusCode: "Accepted",
        defaultProject: {
            id: 0,
            projectName: "K-Solutions"
        },
        defaultHoursNumber: 8,
        reservations: [{
            id: 1,
            hours: 40,
            project: {
                id: 1,
                projectName: "Lids PL"
            },
            description: "Opis",
            availableProjects: [
                {
                    hours: 10,
                    project: {
                        id: 2,
                        projectName: "IacsPlus"
                    }
                },
                {
                    hours: 10,
                    project: {
                        id: 3,
                        projectName: "PZSIP"
                    }
                },
                {
                    hours: 10,
                    project: {
                        id: 4,
                        projectName: "Wyrocznia"
                    }
                }
            ]
        }]
    },
        {
            day: "10",
            month: "05",
            year: "2016",
            statusCode: "Rejcted",
            reservations: [{
                id: 2,
                hours: 40,
                project: {
                    id: 5,
                    projectName: "Optipos PL"
                },
                description: "Opis",
                availableProjects: [
                    {
                        hours: 10,
                        project: {
                            id: 6,
                            projectName: "Facebook"
                        }
                    },
                    {
                        hours: 10,
                        project: {
                            id: 7,
                            projectName: "Google"
                        }
                    },
                    {
                        hours: 10,
                        project: {
                            id: 8,
                            projectName: "ReactJs"
                        }
                    }
                ]
            }]
        }]
};



class TimesheetBox extends Component {
    render() {
        return (
            <div>
                <Header />
                <Content data={data} />
                <Footer />
            </div>
        );
    }
}

export default TimesheetBox
