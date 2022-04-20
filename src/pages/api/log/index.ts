import * as winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, prettyPrint, printf } = winston.format

const transport: DailyRotateFile = new DailyRotateFile({
  filename: '%DATE%.log',
  dirname: './src/pages/api/log/files/',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
})

transport.on('rotate', function (oldFilename, newFilename) {
  // do something fun
})

const myFormat = printf(({ level, message, timestamp }) => {
  const zeroPad = (num: number) => {
    const places = 2;
    const zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  };
  const date = new Date(timestamp);
  const time = `${date.getFullYear()}-${zeroPad(date.getMonth())}-${zeroPad(date.getDay())} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  
  return `[${time}] [${level}]: "${message}"`;
})

const logger = winston.createLogger({
  format: combine(timestamp(), prettyPrint(), myFormat),
  transports: [transport],
})

export default logger
