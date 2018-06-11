const chokidar = require('chokidar');
const { spawn } = require('child_process');

const srcWatcher = chokidar.watch('src/');
const postsWatcher = chokidar.watch('posts/');

srcWatcher
  .on('add', runBuild)
  .on('change', runBuild)
  .on('unlink', runBuild)
  .on('error', (error) => console.error('Error: ', error));
postsWatcher
  .on('add', runBuild)
  .on('change', runBuild)
  .on('unlink', runBuild)
  .on('error', (error) => console.error('Error: ', error));

function reload() {
	const code  = 'tell application "Google Chrome"\n\
  reload active tab of window 1\n\
end tell\n';
	spawn('osascript', ['-e', code])
		.on('close', () => console.log('Browser reloaded'))
		.on('error', (e) => console.error(e));
}

function runBuild() {
	spawn('node', ['index'])
		.on('close', () => {
			console.log('Finished build');
			reload();
		})
		.on('data', (data) => console.log(data))
		.on('error', (e) => console.error(e));
}
