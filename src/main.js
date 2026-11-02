import './style.css';
import config from '../lab-config.json';

const projectId = config.projectId;
const cloudOrigin = import.meta.env.VITE_FIREBASE_ORIGIN || `https://${projectId}.web.app`;
const button = document.getElementById('refresh');
const health = document.getElementById('health');
const detail = document.getElementById('health-detail');

document.getElementById('project-id').textContent = projectId;
document.getElementById('open-console').href = cloudOrigin;

async function refresh() {
  button.disabled = true;
  health.textContent = 'Checking…';
  detail.textContent = '';
  try {
    const response = await fetch(`${cloudOrigin}/lab-status.json`, {
      cache: 'no-store', signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const status = await response.json();
    if (status.projectId !== projectId || status.status !== 'operational') {
      throw new Error('Unexpected project status');
    }
    health.textContent = 'Connected';
  } catch (error) {
    health.textContent = 'Unavailable';
    detail.textContent = error.message;
  } finally {
    button.disabled = false;
  }
}

button.addEventListener('click', refresh);
refresh();
