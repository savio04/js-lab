import { createReadStream } from "node:fs";
import http from "node:http";
import { spawn } from "node:child_process";

const server = http.createServer((request, response) => {
  // const headers = {
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "*"
  // }

  // if(request.method === "OPTIONS") {
  //   response.setHeader(headers)

  //   return response.end()
  // }

  response.writeHead(200, {
    "Content-Type": "video/mp4",
  });

  const ffmpegProcess = spawn('ffmpeg',
    [
      '-i', 'pipe:0',
      '-f', 'mp4',    
      '-vcodec', 'h264',
      '-acodec', 'aac',
      '-movflags', 'frag_keyframe+empty_moov+default_base_moof',
      '-b:v', '1500k',
      '-maxrate', '1500k',
      '-bufsize', '1000k',
      '-f', 'mp4',
      '-vf', "monochrome,drawtext=text='meuteste@gmail.com':x=10:y=H-th-10:fontsize=25:fontcolor=yellow:shadowcolor=black:shadowx=2:shadowy=2",
      'pipe:1'
    ], {
      stdio: ['pipe','pipe','pipe']
    })

  createReadStream("./assets/video_convert.mp4").pipe(ffmpegProcess.stdin);

  ffmpegProcess.stderr.on('data', msg => console.log(msg.toString()))

  ffmpegProcess.stdout.pipe(response)
  
  request.once('close', () => {
    ffmpegProcess.stdout.destroy()
    ffmpegProcess.stdin.destroy()
    console.log('disconnected!', ffmpegProcess.kill())
  })
});

server.listen(3001, () => {
  console.log(`Api iniciada 3001`);
});
