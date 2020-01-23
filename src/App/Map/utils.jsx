const getOverlapFromTwoExtents = (l, r) => {
    var overlapPadding = 0;
    l.left = l.x - overlapPadding;
    l.right = l.x + l.width + overlapPadding;
    l.top = l.y - overlapPadding;
    l.bottom = l.y + l.height + overlapPadding;
    r.left = r.x - overlapPadding;
    r.right = r.x + r.width + overlapPadding;
    r.top = r.y - overlapPadding;
    r.bottom = r.y + r.height + overlapPadding;
    var a = l;
    var b = r;

    if (a.left >= b.right || a.top >= b.bottom ||
    a.right <= b.left || a.bottom <= b.top ){
        return false;
    } else {
        return true;
    }
};

const cssClass = (c) => c
    .replace('@', '')
    .replace('.', '')
    .replace('#', '')
    .split(' ')
    .join('');

export { getOverlapFromTwoExtents, cssClass };
