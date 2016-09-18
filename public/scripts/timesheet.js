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

var Header = React.createClass({
    render: function () {
        return (
            <div className="header">
                <div className="well"></div>
            </div>
        );
    }
});


var Footer = React.createClass({
    render: function () {
        return (
            <div className="footer">
                <p>Karol Kornecki</p>
            </div>
        );
    }
});

var DateBox = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h3>{this.props.weekDateRangeLabel}</h3>
                </div>
            </div>
        );
    }
});

var WeekNavigationBox = React.createClass({
    handleGoBackward: function () {
        alert('back');
    },
    handleGoForward: function () {
        alert('next');
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <nav>
                        <ul className="pager">
                            <li><a href="#" className="width-100" onClick={this.handleGoBackward}>Previous</a></li>
                            <li><a href="#" className="width-100" onClick={this.handleGoForward}>Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
});


var TimesheetTableHeader = React.createClass({
    render: function () {
        return (
            <div className="row timesheet-table-header">
                <div className="col-lg-1">
                    <span>Date</span>
                </div>
                <div className="col-lg-5">
                    <span>Project name and hours</span>
                </div>
                <div className="col-lg-1">
                </div>
                <div className="col-lg-2">
                    <span>Description</span>
                </div>
                <div className="col-lg-1">
                    <span>Actions</span>
                </div>
                <div className="col-lg-2">
                    <span>Status</span>
                </div>
            </div>
        );
    }
});

var TimesheetTableContent = React.createClass({
    render: function () {
        var rows = this.props.weekdays.map(function (weekday) {
            return (
                <TimesheetTableRow key={weekday.day} weekday={weekday}/>
            );
        });
        return (
            <div>
                {rows}
            </div>
        );
    }
});

var TimesheetTableRow = React.createClass({
    getInitialState: function () {
        return {reservations: this.props.weekday.reservations};
    },

    handleAddReservation: function () {
        var availableProject = {
            project: this.props.weekday.defaultProject,
            hours: this.props.weekday.defaultHoursNumber
        };
        var genKey = Math.random() * 1000;
        var new_reservation = {
            id: genKey,
            project: {
                projectName: null
            },
            availableProjects: [availableProject]
        };
        this.props.weekday.reservations.push(new_reservation);
        this.setState({reservations: this.props.weekday.reservations});

    },
    handleRemoveReservation: function (reservation) {
        var index = this.props.weekday.reservations.indexOf(reservation);
        if (index > -1) {
            this.props.weekday.reservations.splice(index, 1);
            this.setState({reservations: this.props.weekday.reservations});
        }
    },
    handleOpenWeekdayDescription: function () {
        alert('open weekday description');
    },
    handleSetDefault: function () {
        this.props.weekday.reservations[0].project = this.props.weekday.defaultProject;
        this.props.weekday.reservations[0].hours = this.props.weekday.defaultHoursNumber;
        this.setState({reservations: this.props.weekday.reservations}); // Don't propagate change down the component tree.
    },
    render: function () {
        return (
            <div className="row timesheet-row">
                <div className="col-lg-1">
                    <span>{this.props.weekday.day}/{this.props.weekday.month}/{this.props.weekday.year}</span>
                </div>

                <ReservationListBox reservations={this.state.reservations}
                                    onRemoveReservation={this.handleRemoveReservation}/>

                <div className="col-lg-1">
                    <button type="button" className="btn btn-success" onClick={this.handleAddReservation}>
                        <span className="glyphicon  glyphicon-plus img-circle text-success"></span>
                    </button>
                </div>
                <div className="col-lg-2">
                    <button type="button" className="btn btn-default" onClick={this.handleOpenWeekdayDescription}>
                        <span className="glyphicon glyphicon-pencil"/>
                    </button>
                </div>
                <div className="col-lg-1">
                    <button type="button" className="btn  btn-success" title="Set default"
                            onClick={this.handleSetDefault}>
                        <span className="glyphicon glyphicon-time img-circle text-success"/>
                    </button>
                </div>
                <div className="col-lg-2">
                    <span>{this.props.weekday.statusCode}</span>
                </div>
            </div>
        );
    }
});

var ReservationListBox = React.createClass({
    render: function () {
        var reservations = this.props.reservations.map(function (reservation) {
            return (
                <ReservationBox key={reservation.id}
                                reservation={reservation}
                                onRemoveReservation={this.props.onRemoveReservation}/>
            );
        }.bind(this));
        return (
            <div className="col-lg-5">
                {reservations}
            </div>
        );
    }
});

var ReservationBox = React.createClass({
    getInitialState: function () {
        return {
            projectName: this.props.reservation.project.projectName,
            hours: this.props.reservation.hours
        }
    },
    onSelectProject: function (selectedProject) {
        this.setState({projectName: selectedProject.projectName});
        this.props.reservation.project = selectedProject;
    },
    handleHoursChange: function (e) {
        this.setState({hours: e.target.value})
        this.props.reservation.hours = e.target.value;
    },
    handleOpenDescriptionModal: function () {
        alert('open reservation description');
    },
    handleRemoveReservation: function () {
        this.props.onRemoveReservation(this.props.reservation);
    },
    render: function () {
        return (
            <div>
                <div className="btn-group timesheet-project-column">
                    <button type="button"
                            className="btn btn-primary">{this.state.projectName}</button>
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        <span className="caret"></span>
                        <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <AvailableProjectsListBox reservation={this.props.reservation}
                                              onSelectProject={this.onSelectProject}/>
                </div>
                <div className="timesheet-column">
                    <button type="button" className="btn btn-default" onClick={this.handleOpenDescriptionModal}>
                        <span className="glyphicon glyphicon-pencil"/>
                    </button>
                </div>
                <div className="timesheet-column">
                    <input type="text" className="form-control timesheet-hour"
                           value={this.state.hours}
                           onChange={this.handleHoursChange}/>
                </div>
                <div className="timesheet-column">
                    <button type="button" className="btn btn-danger" onClick={this.handleRemoveReservation}>
                        <span className="glyphicon  glyphicon-trash img-circle text-danger"></span>
                    </button>
                </div>
            </div>
        );
    }
});


var AvailableProjectsListBox = React.createClass({
    render: function () {
        var availableProjects = this.props.reservation.availableProjects.map(function (availableProject) {
            return (
                <AvailableProject key={availableProject.project.id}
                                  availableProject={availableProject}
                                  onSelectProject={this.props.onSelectProject}/>
            );
        }.bind(this));
        return (
            <ul className="dropdown-menu">
                {availableProjects}
            </ul>
        );
    }
});

var AvailableProject = React.createClass({
    handleSelectProject: function () {
        this.props.onSelectProject(this.props.availableProject.project);
    },
    render: function () {
        return (
            <li><a href="#" onClick={this.handleSelectProject}>
                {this.props.availableProject.project.projectName}</a>
            </li>
        );
    }
});

var TimesheetButtons = React.createClass({
    handleEdit: function (e) {
        e.preventDefault();
        this.props.onEdit();
    },
    handleSave: function (e) {
        e.preventDefault();
        this.props.onSave();
    },
    handleSubmit: function (e) {
        e.preventDefault();
        this.props.onSubmit();
    },
    handlePrint: function (e) {
        e.preventDefault();
        this.props.onPrint();
    },
    handleReject: function (e) {
        e.preventDefault();
        this.props.onReject();
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-default" onClick={this.handleEdit}>
                            <span className="glyphicon glyphicon-ban-circle"></span>&nbsp;<span>Edit</span>
                        </button>
                        <button type="submit" className="btn btn-primary" onClick={this.handleSave}>
                            <span className="glyphicon glyphicon-save"></span>&nbsp;<span>Save</span>
                        </button>
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
                            <span className="glyphicon glyphicon-send"></span>&nbsp;<span>Submit</span>
                        </button>
                        <button type="submit" className="btn btn-primary" onClick={this.handlePrint}>
                            <span className="glyphicon glyphicon-print"></span>&nbsp;<span>Print</span>
                        </button>
                        <button type="submit" className="btn btn-primary" onClick={this.handleReject}>
                            <span className="glyphicon glyphicon-remove"></span>&nbsp;<span>Request for rejection</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});

var SummaryTitle = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h4>Your reservations</h4>
                </div>
            </div>
        );
    }
});


var SummaryHeader = React.createClass({
    render: function () {
        return (
            <div className="row timesheet-table-header">
                <div className="col-lg-3">
                    <span>Project</span>
                </div>
                <div className="col-lg-3">
                    <span className="float-right">Hours</span>
                </div>
            </div>
        );
    }
});

var SummaryContent = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-lg-3">
                    <span>IACSplus</span>
                </div>
                <div className="col-lg-3">
                    <span className="float-right">40</span>
                </div>
            </div>
        );
    }
});

var Content = React.createClass({
    onEdit: function () {
        alert(this.props.data.weekDays[0].reservations[0].project.projectName);
        alert(this.props.data.weekDays[0].reservations[0].hours);
    },
    onSave: function () {

    },
    onSubmit: function () {

    },
    onPrint: function () {

    },
    onReject: function () {

    },
    render: function () {
        return (
            <div className="container">
                <form>
                    <DateBox weekDateRangeLabel={this.props.data.weekDateRangeLabel}/>
                    <WeekNavigationBox />
                    <TimesheetTableHeader />
                    <TimesheetTableContent weekdays={this.props.data.weekDays}/>
                    <TimesheetButtons onEdit={this.onEdit}
                                      onSave={this.onSave}
                                      onSubmit={this.onSubmit}
                                      onPrint={this.onPrint}
                                      onReject={this.onReject}/>
                    <SummaryTitle />
                    <SummaryHeader />
                    <SummaryContent />
                </form>
            </div>
        );
    }
});

var TimesheetBox = React.createClass({
    render: function () {
        return (
            <div>
                <Header />
                <Content data={data}/>
                <Footer />
            </div>
        );
    }
});

ReactDOM.render(
    <TimesheetBox />,
    document.getElementById('content')
);
