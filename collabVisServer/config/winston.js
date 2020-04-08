// LOGGING VIA WINSTON PACKAGE
const appRoot = require("app-root-path");
const moment = require("moment");
const { createLogger, format, transports } = require("winston");

const tsFormat = () =>
    moment()
        .format("YYYY-MM-DD hh:mm:ss")
        .trim();
const options = {
    file: {
        level: "debug",
        filename: `${appRoot}/logs/dataReceiver.log`,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        tailable: true, // automatically roll over old log files
        format: format.combine(
            format.timestamp({ format: tsFormat }),
            format.json(),
            format.prettyPrint()     // Add this in once winston 3.2 released
        )
    },
    console: {
        level: "info",
        format: format.simple(),
        colorize: true
    }
};

let logger = createLogger({
    transports: [new transports.File(options.file), new transports.Console(options.console)],
    exitOnError: false // do not exit on handled exceptions
});

// export to make it available to other parts of the application
module.exports = logger;
