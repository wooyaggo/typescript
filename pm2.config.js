const NODE_ENV = "development";

process.env.NODE_ENV = NODE_ENV;

module.exports = {
	apps: [
		{
			name: "TypeScript Project",
			script: "bin/",
			watch: [
				"bin/",
			],
			source_map_support: true,
			node_args: [ "--debug=5859" ],
			exec_mode: "fork",
			instances: 1,
			detached: true,
			max_restart: 1,
			env: {
				NODE_ENV: NODE_ENV
			},

			error_file: "logs/error.log",
			out_file: "logs/info.log",
			log_date_format: "YYYY.MM.DD HH:mm:ss:ms",
		}
	]
}