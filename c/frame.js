const t = (async () => {
    const t = await fetch("process-script.js"),
        e = await t.text();
    return URL.createObjectURL(new Blob([e], {
        type: "text/javascript"
    }))
})();
let e = null;
onmessage = async ({
    data: r
}) => {
    if ("object" == typeof r && null !== r)
        if (function(t) {
                return "process-script" === t.action
            }(r) || function(t) {
                return "process-svg" === t.action
            }(r)) {
            try {
                ! function() {
                    if (e) throw Error("Worker already running");
                    e = t.then((t => new Worker(t)))
                }()
            } catch (t) {
                const e = {
                    message: t.message
                };
                throw r.port.postMessage({
                    error: e
                }), t
            }(await e).postMessage(r, [r.port])
        } else(function(t) {
            return "terminate-worker" === t.action
        })(r) && async function() {
            if (!e) return;
            const t = e;
            e = null, (await t).terminate()
        }()
};
