export default defineEventHandler((event) => {
    const res = event.res;
    const year = 31536000;
    const hour = 60 * 60;
    const url = event.req.url;
    const maxage = url.match(/(.+)\.(jpg|jpeg|gif|webp|css|png|js|ico|svg|mjs)/) ? year : hour;
    res.setHeader("Cache-Control", `max-age=${maxage} s-maxage=${maxage}`);
});
