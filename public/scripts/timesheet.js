var data = {
    weekDateRangeLabel: "20-27.09.2016",
    weekDays: [{
        day: "09",
        month: "05",
        year: "2016",
        statusCode: "Accpeted",
        reservations: [{}]
    },
        {
            day: "10",
            month: "05",
            year: "2016",
            statusCode: "Accpeted",
            reservations: []
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
    render: function () {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <nav>
                        <ul className="pager">
                            <li><a href="#" className="width-100">Previous</a></li>
                            <li><a href="#" className="width-100">Next</a></li>
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
        return (
            <div className="row">
                <div className="col-lg-1">
                    <span>15/09/2015</span>
                </div>
                <div className="col-lg-5">
                    <div className="btn-group timesheet-project-column">
                        <button type="button" className="btn btn-primary">IACSPlus</button>
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="caret"></span>
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a href="#">PZSip</a></li>
                            <li><a href="#">LIDS PL</a></li>
                            <li><a href="#">Puma-Gumka</a></li>
                        </ul>
                    </div>
                    <div className="timesheet-column">
                        <button type="button" className="btn btn-default">
                            <span className="glyphicon glyphicon-pencil"/>
                        </button>
                    </div>
                    <div className="timesheet-column">
                        <input type="text" className="form-control timesheet-hour"/>
                    </div>
                    <div className="timesheet-column">
                        <button type="button" className="btn btn-danger">
                            <span className="glyphicon  glyphicon-trash img-circle text-danger"></span>
                        </button>
                    </div>
                </div>
                <div className="col-lg-1">
                    <button type="button" className="btn btn-success">
                        <span className="glyphicon  glyphicon-plus img-circle text-success"></span>
                    </button>
                </div>
                <div className="col-lg-2">
                    <button type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-pencil"/>
                    </button>
                </div>
                <div className="col-lg-1">
                    <button type="button" className="btn  btn-success" title="Set default">
                        <span className="glyphicon glyphicon-time img-circle text-success"/>
                    </button>
                </div>
                <div className="col-lg-2">
                    <span>Accepted</span>
                </div>
            </div>
        );
    }
});

var TimesheetButtons = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default">
                            <span className="glyphicon glyphicon-ban-circle"></span>&nbsp;<span>Edit</span>
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <span className="glyphicon glyphicon-save"></span>&nbsp;<span>Save</span>
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <span className="glyphicon glyphicon-send"></span>&nbsp;<span>Submit</span>
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <span className="glyphicon glyphicon-print"></span>&nbsp;<span>Print</span>
                        </button>
                        <button type="submit" className="btn btn-primary">
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
    render: function () {
        return (
            <div className="container">
                <DateBox weekDateRangeLabel={this.props.data.weekDateRangeLabel}/>
                <WeekNavigationBox />
                <TimesheetTableHeader />
                <TimesheetTableContent />
                <TimesheetButtons />
                <SummaryTitle />
                <SummaryHeader />
                <SummaryContent />
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