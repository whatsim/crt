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

	Seriously.plugin('alpha-noise', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [


				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				
				`float rand(vec2 co){`,
    				`return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);`,
    			`}`,

				'void main(void) {',
				'	vec2 pixel = vTexCoord;',
				'	vec4 color = texture2D(source, pixel);',
				'	color.a *= pow(rand(gl_FragCoord.xy*0.001), 0.4);',

    			'	gl_FragColor = color;',
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
			
		},
		title: 'Pincushion Distortion',
		description: 'Distort image as though on a curved surface.'
	});
}));