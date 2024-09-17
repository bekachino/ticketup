export const checkVersionAndClearCache = () => {
  const currentVersion = '1.0.0';
  const cachedVersion = localStorage.getItem('TicketUpVersion');
  
  if (cachedVersion !== currentVersion) {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.trim().startsWith('expires=') ? c : `${c.trim()}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    });
    
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name).then(_ => {});
      });
    });
    
    localStorage.setItem('TicketUpVersion', currentVersion);
    
    window.location.reload();
  }
};
