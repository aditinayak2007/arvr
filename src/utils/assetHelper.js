/**
 * Resolves an asset path to take into account the Vite base path (e.g. GitHub Pages /arvr/ subpath)
 * @param {string} path - Relative or absolute asset path
 * @returns {string} - Properly prefixed asset path
 */
export function resolveAssetUrl(path) {
  if (!path) return path;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : base + '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cleanBase + cleanPath;
}
