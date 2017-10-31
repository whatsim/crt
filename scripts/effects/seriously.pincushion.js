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

	Seriously.plugin('pincushion', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform float k;',
				
				'const vec2 half2 = vec2(0.5);',

				'void main(void) {',
				'	vec2 pixel = vTexCoord - half2;',
				'	float uva = atan(pixel.x, pixel.y);',
    			'	float uvd = sqrt(dot(pixel, pixel));',
    			'	uvd = uvd*(1.0 + k*uvd*uvd);',

				//keep alpha the same
				'	gl_FragColor = texture2D(source, half2 + vec2(sin(uva), cos(uva))*uvd);',
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
			k: {
				type: 'number',
				uniform: 'k',
				defaultValue: 0.1,
				min: -1,
				max: 1
			}
		},
		title: 'Pincushion Distortion',
		description: 'Distort image as though on a curved surface.'
	});
}));
