<script context="module">
    const iconColor = "#9aa";

    export const cancel = (color = iconColor) => `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style=" fill:${color};"
    ><path
        d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M16.7,15.3l-1.4,1.4L12,13.4l-3.3,3.3l-1.4-1.4l3.3-3.3 L7.3,8.7l1.4-1.4l3.3,3.3l3.3-3.3l1.4,1.4L13.4,12L16.7,15.3z"
    /></svg
    >
    `;

    export const del = (color = iconColor) => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill:${color}"
    ><path
        d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"
    /></svg
    >
    `;

    export const edit = (color = iconColor) => `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 24 24"
    style=" fill:${color};"
    >
    <path
        d="M 18.414062 2 C 18.158188 2 17.902031 2.0974687 17.707031 2.2929688 L 16 4 L 20 8 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.925594 2.0974687 18.669937 2 18.414062 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z"
    /></svg
    >
    `;

    export const empty = (color = iconColor) => `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="13 28 146 116"
    ><g
        fill="none"
        fill-rule="nonzero"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
        style="mix-blend-mode: normal"
        ><path d="M0,172v-172h172v172z" fill="none" /><g fill="${color}" {
    
}
                d="M143.33333,28.66667h-114.66667c-7.91917,0 -14.33333,6.41417 -14.33333,14.33333v86c0,7.91917 6.41417,14.33333 14.33333,14.33333h114.66667c7.91917,0 14.33333,-6.41417 14.33333,-14.33333v-86c0,-7.91917 -6.41417,-14.33333 -14.33333,-14.33333zM35.83333,121.83333l25.08333,-32.25l17.91667,21.57167l25.08333,-32.32167l32.25,43z"
            /></g
        ></g
    ></svg
    >      
    `;

    export const grid = (color = iconColor) => `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style="fill: ${color}"
    ><path
        d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm5 2h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm1-6h4v4h-4V5zM3 20a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6zm2-5h4v4H5v-4zm8 5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6zm2-5h4v4h-4v-4z"
    /></svg
    >
    `;

    export const ok = (color = iconColor) => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill:${color};">
    <path
        d="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M10,17.414l-4.707-4.707 l1.414-1.414L10,14.586l7.293-7.293l1.414,1.414L10,17.414z"
    /></svg
    >
    `;

    export const save = (color = iconColor) => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill: ${color};"
    ><path
        d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
    /></svg
    >
    `;

    export const saved = (color = iconColor) => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="fill:${color}"
    ><path d="m11.998 17 7-8h-14z" /></svg
    >
    `;

    export const search = (color = iconColor) => `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style="fill: ${color}"
    ><path
        d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"
    /></svg
    >
    `;

    export const slider = (color = iconColor) => `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style="fill:${color}"
    ><path
        d="M13 5h9v2h-9zM2 7h7v2h2V3H9v2H2zm7 10h13v2H9zm10-6h3v2h-3zm-2 4V9.012h-2V11H2v2h13v2zM7 21v-6H5v2H2v2h3v2z"
    /></svg
    >
    `;

    export const profile = (color = iconColor) => `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 172 172"
    style=" fill:#000;"
    ><g
        fill="none"
        fill-rule="nonzero"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
        style="mix-blend-mode: normal"
        ><path d="M0,172v-172h172v172z" fill="none" /><g fill="${color}"
            ><path

                d="M13.90265,152.15385c0,0 0,-9.92308 0,-11.24099c0,-14.54867 21.8101,-27.77944 45.63581,-32.43088c0,0 7.28726,-3.95373 5.29747,-11.24099c-7.28726,-9.25121 -9.27704,-19.17428 -9.27704,-19.17428c-1.31791,-0.67187 -3.30769,-1.98978 -4.6256,-3.30769c-1.98978,-2.66165 -4.6256,-10.59495 -3.95372,-16.53846c0.64603,-5.29747 1.96394,-3.30769 2.63581,-4.6256c-5.29747,-11.91287 -2.63581,-27.13342 3.30769,-38.3744c12.5589,-21.83594 39.02044,-15.22055 43,-7.28726c25.14363,-4.6256 24.47176,35.06671 20.51803,44.98978c0,0 1.96394,0.67188 1.96394,9.92308c-0.64604,9.92308 -8.57933,15.86659 -8.57933,15.86659c0,2.66165 -3.30769,10.59495 -8.60517,17.88221c-4.6256,9.2512 4.6256,11.24098 4.6256,11.24098c23.82572,4.6256 45.63582,17.85637 45.63582,32.40505c0,1.31791 0,11.24099 0,11.24099c0,9.27704 -35.71274,19.20012 -68.78967,19.20012c-32.40504,0 -68.78966,-3.30769 -68.78966,-18.52824z"
            /></g
        ></g
    ></svg
> `;

    export const home = (color = iconColor) => `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style="fill:${color};"
    ><path
        d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 10 21 L 10 15 L 14 15 L 14 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z"
        /></svg
        >`;

    export const collections = (color = iconColor) => `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="1 1 22 22"
    style="fill: ${color};"
    ><path
        d="M20 2H8c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM8 16V4h12l.002 12H8z"
    /><path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8z" /><path
        d="m12 12-1-1-2 3h10l-4-6z"
    /></svg
>
`;
    export const add = (color = iconColor) => `
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style="fill: ${color}"
    ><path
        d="m9 13 3-4 3 4.5V12h4V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-4H5l3-4 1 2z"
    /><path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z" /></svg
>`;

    export const refresh = (color = iconColor) => `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style=" fill:${color};"
>
    <path
        d="M 12 0 L 8 4 L 12 8 L 12 5 C 15.859 5 19 8.14 19 12 C 19 12.88 18.82925 13.720094 18.53125 14.496094 L 20.046875 16.009766 C 20.651875 14.800766 21 13.442 21 12 C 21 7.038 16.963 3 12 3 L 12 0 z M 3.953125 7.9902344 C 3.348125 9.1992344 3 10.558 3 12 C 3 16.962 7.037 21 12 21 L 12 24 L 16 20 L 12 16 L 12 19 C 8.141 19 5 15.86 5 12 C 5 11.12 5.17075 10.279906 5.46875 9.5039062 L 3.953125 7.9902344 z"
    /></svg
>`;

    export const navIcons = [home, collections, add, search, profile];
</script>
