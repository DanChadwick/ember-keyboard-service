import Ember from 'ember';
import KeyboardService from 'ember-keyboard-service/services/keyboard';
import KeyboardMixin from 'ember-keyboard-service/mixins/keyboard';
import { module, test } from 'qunit';

const { computed, run } = Ember;

module('Unit | Mixin | keyboard');

// Replace this with your real tests.
test('I can declare keyboard handlers', function(assert) {
  assert.expect(1);

  var KeyboardObject = Ember.Object.extend(KeyboardMixin, {
    keyboard: KeyboardService.create(),

    handler() { assert.ok(true); },
    keyboardHandlers: [
      { key: 'x', handler: 'handler' }
    ]
  });

  var subject = KeyboardObject.create();

  $(document.body).trigger($.Event('keydown', { key: 'x' }));
});

test('I can declare no keyboard handlers', function(assert) {
  assert.expect(0);

  var KeyboardObject = Ember.Object.extend(KeyboardMixin, {
    keyboard: KeyboardService.create(),
  });

  var subject = KeyboardObject.create();
});

test('I can declare keyboard handlers with static arguments', function(assert) {
  assert.expect(1);

  var KeyboardObject = Ember.Object.extend(KeyboardMixin, {
    keyboard: KeyboardService.create(),

    handler(arg) { assert.equal(arg, 'foo'); },
    keyboardHandlers: [
      { key: 'x', handler: 'handler', arguments: ['foo'] }
    ]
  });

  var subject = KeyboardObject.create();

  $(document.body).trigger($.Event('keydown', { key: 'x' }));
});

test('It fires on multiple instances', function(assert) {
  assert.expect(2);

  var KeyboardObject = Ember.Object.extend(KeyboardMixin, {
    keyboard: KeyboardService.create(),

    handler() { assert.ok(true); },
    keyboardHandlers: [
      { key: 'x', handler: 'handler' }
    ]
  });

  var one = KeyboardObject.create();
  var two = KeyboardObject.create();

  $(document.body).trigger($.Event('keydown', { key: 'x' }));
});

test('Handler must exist', function(assert) {
  var KeyboardObject = Ember.Object.extend(KeyboardMixin, {
    keyboard: KeyboardService.create(),
    keyboardHandlers: [
      { key: 'x', handler: 'handler' }
    ]
  });

  var subject = KeyboardObject.create();

  assert.throws(() =>  {
    $(document.body).trigger($.Event('keydown', { key: 'x' }));
  }, /Assertion Failed/);

  // Needs destroy or it will interfere with other tests...
  run(() => subject.destroy());
});

test('I can declare keyboard handlers with options', function(assert) {
  assert.expect(1);

  var KeyboardObject = Ember.Object.extend(KeyboardMixin, {
    keyboard: KeyboardService.create(),

    handler() { assert.ok(true); },
    keyboardHandlers: [
      { key: 'x', handler: 'handler', options: { once: true } }
    ]
  });

  var subject = KeyboardObject.create();

  $(document.body).trigger($.Event('keydown', { key: 'x' }));
  $(document.body).trigger($.Event('keydown', { key: 'x' }));
});

test('keyboardHandlers is a concatenated property', function(assert) {
  assert.expect(2);

  var KeyboardObject = Ember.Object.extend(KeyboardMixin, {
    keyboard: KeyboardService.create(),

    handler() { assert.ok(true); },
    keyboardHandlers: [
      { key: 'x', handler: 'handler' }
    ]
  });

  var ExtendedKeyboardObject = KeyboardObject.extend({
    keyboardHandlers: [
      { key: 'x', handler: 'handler' }
    ]
  });

  var subject = ExtendedKeyboardObject.create();

  $(document.body).trigger($.Event('keydown', { key: 'x' }));
});