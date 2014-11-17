'use strict';

var React = require('react');
var moment = require('moment');
var { Link, Navigation, CurrentPath } = require('react-router');

var ActiveState = require('../../../mixins/ActiveStateMixin');

var ActionMenu = React.createClass({

    mixins: [ Navigation, ActiveState ],

    render: function () {
        /* jshint ignore:start */

        //TODO fill in hrefs
        var listing = this.props.listing,
            overviewHref = this.makeHref(this.getActiveRoutePath(), null, {
                listing: listing.id(),
                action: 'view',
                tab: 'overview'
            }),
            editHref = this.makeHref(this.getActiveRoutePath(), null, {
                listing: listing.id(),
                action: 'edit'
            }),
            linkParams = {listingId: listing.id()},
            review = <li><a href="review">Review</a></li>,
            edit = <li><a href={editHref}>Edit</a></li>,
            preview = <li><a href={overviewHref}>Preview</a></li>,
            del = <li><Link to="delete" params={linkParams}>Delete</Link></li>,
            view = <li><a href={overviewHref}>View</a></li>,
            disable = <li><a href="disable">Disable</a></li>,
            feedback = <li><Link to="feedback" params={linkParams}>Read Feedback</Link></li>,
            links,
            approvalStatus = listing.approvalStatus();

        switch (approvalStatus) {
            case 'APPROVED':
                links = [edit, view, disable, del];
                break;
            case 'PENDING':
                links = [edit, preview, del];
                break;
            case 'REJECTED':
                links = [edit, feedback, preview, del];
                break;
            case 'DRAFT':
            default:
                links = [edit, preview, del];
        }

        //use hidden checkbox to manage menu toggle state
        return (
            <label className="MyListingTile__actionMenu">
                <input type="checkbox" />
                <span className="MyListingTile__actionMenuButton" />
                <ul>{links}</ul>
            </label>
        );
        /* jshint ignore:end */
    }
});

var ListingStatus = React.createClass({
    render: function () {
        /* jshint ignore:start */
        return (
            <span className="MyListingTile__approvalStatus" />
        );
        /* jshint ignore:end */
    }
});

var ApprovalDate = React.createClass({
    render: function () {
        var approvalDate = this.props.listing.approvalDate,
            approvalDateString = moment(approvalDate).format('MM/DD/YY');

        /* jshint ignore:start */
        return (
            <span className="MyListingTile__approvalDate">{approvalDateString}</span>
        );
        /* jshint ignore:end */
    }
});

var InfoBar = React.createClass({
    render: function () {
        var listing = this.props.listing;

        /* jshint ignore:start */
        return (
            <h5 className="MyListingTile__infoBar">
                <span className="title">{listing.title()}</span>
                <ListingStatus listing={listing} />
                <ApprovalDate listing={listing} />
            </h5>
        );
        /* jshint ignore:end */
    }
});

module.exports = React.createClass({

    mixins: [ Navigation, ActiveState ],

    render: function () {
        var listing = this.props.listing,
            overview = this.makeHref(this.getActiveRoutePath(), null, {
                listing: listing.id(),
                action: 'view',
                tab: 'overview'
            }),
            approvalStatus = listing.approvalStatus(),
            classSet = React.addons.classSet({
                'draft': approvalStatus === 'IN_PROGRESS',
                'pending': approvalStatus === 'PENDING',
                'needs-action': approvalStatus === 'REJECTED',
                'published': approvalStatus === 'APPROVED',
                'MyListingTile': true
            });


        /* jshint ignore:start */
        return (
            <li className={classSet}>
                <ActionMenu listing={listing} />
                <a href={overview}>
                    <img className="MyListingTile__img" src={listing.imageLargeUrl()} />
                </a>
                <InfoBar listing={listing} />
            </li>
        );
        /* jshint ignore:end */
    }
});
