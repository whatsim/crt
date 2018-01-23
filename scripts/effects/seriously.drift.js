/* global define, require */
(function (root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['seriously'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('seriously'));
	} else {
		if (!root.Seriously) {
			root.Seriously = { plugin: function (name, opt) { this[name] = opt; } };
		}
		factory(root.Seriously);
	}
}(window, function (Seriously) {
	'use strict';

	Seriously.plugin('drift', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform float drift;',
				'const vec2 half2 = vec2(0.5);',

				'void main(void) {',
				'	vec2 pixel = vTexCoord;',
				'	pixel.x = pixel.x - drift * ((1.0 / (5.0 - pow(pixel.y,50.0)))) + 0.2 * drift;',

				//keep alpha the same
				'	gl_FragColor = texture2D(source, pixel);',
				'}'
			].join('\n');
			return shaderSource;
		},
		inPlace: true,
		inputs: {
			source: {
				type: 'image',
				uniform: 'source'
			},
			drift: {
				type: 'number',
				uniform: 'drift',
				defaultValue: 2,
				min: 0,
				max: 2
			}
		},
		title: 'Pincushion Distortion',
		description: 'Distort image as though on a curved surface.'
	});
}));
