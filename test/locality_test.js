/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

	/*
		======== A Handy Little QUnit Reference ========
		http://docs.jquery.com/QUnit

		Test methods:
			expect(numAssertions)
			stop(increment)
			start(decrement)
		Test assertions:
			ok(value, [message])
			equal(actual, expected, [message])
			notEqual(actual, expected, [message])
			deepEqual(actual, expected, [message])
			notDeepEqual(actual, expected, [message])
			strictEqual(actual, expected, [message])
			notStrictEqual(actual, expected, [message])
			raises(block, [expected], [message])
	*/

	module('jQuery#Generic', {
		setup: function() {
			this.elems = $('a');
		}
	});

	test('is chainable', 1, function() {
		// Not a bad test to run on collection methods.
		strictEqual(this.elems.locality(), this.elems, 'should be chaninable');
	});

	module( "jQuery#Locality", {
		setup: function() {
			$('a').locality();
		}
	});

	test('tags internal links', 1, function() {
		strictEqual($("#local_link").hasClass("local"), true, 'should recognize local links');
	});

	test('tags external links', 1, function() {
		strictEqual($("#external_link").hasClass("external"), true, 'should recognize external links');
	});

	test('tags empty links', 1, function() {
		strictEqual($("#empty_link").hasClass("empty"), true, 'should recognize empty links');
	});

}(jQuery));
