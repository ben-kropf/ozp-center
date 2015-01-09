'use strict';

var React = require('react');
var { cloneWithProps, classSet } = React.addons;
var _ = require('../../../utils/_');

var InputMixin = require('./InputMixin');

var ImageInput = React.createClass({
    mixins: [_.omit(InputMixin, 'render', 'shouldComponentUpdate', 'showError')],

    getInitialState: function() {
        //if the input has received a new value since the last props update, we should not show
        //the error style
        return {changedSinceUpdate: false};
    },

    /**
     * Override render from InputMixin to include the image tag
     */
    render: function () {
        var labelClasses = classSet({ 'input-optional': this.props.optional }),
            tempProps = this.getInputProps(),
            props = _.omit(this.getInputProps(), 'value');

        /*jshint ignore:start */
        return (
            <div className={ this.getClasses() }>
                <label htmlFor={ this.props.id } className={labelClasses}>{ this.props.label }</label>
                <p className="small">{ this.props.description }</p>
                <img className="image-preview" src={this.props.imageUri} />
                { cloneWithProps(this.renderInput(), props) }
                { this.props.help && <p className="help-block small">{ this.props.help }</p>}
            </div>
        );
        /*jshint ignore:end */
    },


    renderInput: function () {
        /*jshint ignore:start */
        return <input type="file" />;
        /*jshint ignore:end */
    },

    //override onChange so that it passes the file to the setter, not the fake
    //file path string that comes from the value property
    onChange: function(e) {
        //set the value to the file if possible.  Fallback to using the input itself
        //as the value if the File API is not available
        var value = typeof e.target.files !== 'undefined' ? e.target.files[0] : e.target;

        e.preventDefault();
        this.props.setter(value);

        this.setState({changedSinceUpdate: true});
    },

    componentDidUpdate: function() {
        //assign value imperatively.  It is necessary that we not touch value except when
        //we need to clear it, and render lacks the means to describe that behavior
        if (!this.props.value) {
            this.refs.input.getDOMNode().value = '';
        }

        this.setState({changedSinceUpdate: false});
    },

    /**
     * In addition to default checks for update, check imageUri
     */
    shouldComponentUpdate: function(newProps) {
        return InputMixin.shouldComponentUpdate.apply(this, arguments) ||
            newProps.imageUri !== this.props.imageUri;
    },

    showError: function(props, blurred) {
        return !this.state.changedSinceUpdate && InputMixin.showError.apply(this, arguments);
    }
});

module.exports = ImageInput;
