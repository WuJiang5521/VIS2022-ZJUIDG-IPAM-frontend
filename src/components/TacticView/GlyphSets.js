const glyphSets = {
    'Badminton': {
        'Ball Height': {
            glyphs: {
                'Very low': <g></g>,
                'Low': <g></g>,
                'Medium': <g></g>,
                'High': <g></g>,
            }
        },
        'Ball Position': {
            glyphs: {
                'Backcourt Left': <g></g>,
                'Backcourt Right': <g></g>,
                'Midfield Left': <g></g>,
                'Midfield Right': <g></g>,
                'Forecourt Left': <g></g>,
                'Forecourt Right': <g></g>,
            }
        },
        'Hit Technique': {
            pos: (size, asGlyph) => asGlyph ?
                `translate(0,${37.5}) scale(${size[0] / 100 * 0.25},${size[1] / 100 * 0.25})` :
                `scale(${size[0] / 100},${size[0] / 100})`,
            params: {
                'Net service': 'NS',
                'Backcourt service': 'BS',
                'Smash': 'Sma.',
                'Drive': 'Dri.',
                'Lift': 'Lift',
                'High clear': 'HClr',
                'Hook': 'Hook',
                'Shot': 'Shot',
                'Net shot': 'NShot',
                'Drop': 'Drop',
                'Push': 'Push',
                'Block': 'Blk',
                'Other': 'Oth.',
                'Score': '+1',
            },
            template: params => {
                return <g>
                    <path d={'M-50 -25H50A50 50 0 0 1 -50 -25Z'} fillOpacity={0} strokeWidth={1} stroke={'#000'}/>
                    <text x={0} y={0} textAnchor={'middle'} dominantBaseline={'middle'} fontSize={20}>{params}</text>
                </g>
            }
        }
    },
    'Tennis': {
        'Ball Position': {},
        'Hitting Pose': {},
        'Hit Technique': {}
    },
    'Table Tennis': {
        'Hitting Tech': {},
        'Player Pos': {},
        'Ball Pos': {},
        'Spin': {},
    },
}

class Renderer {
    pos = () => '';
    _size = [100, 100];
    template = () => null;
    params = {};
    _color = 'black';

    constructor(glyphConfig) {
        if (!glyphConfig) return;
        this.pos = glyphConfig.pos || this.pos;
        this.template = glyphConfig.template || this.template;
        this.params = glyphConfig.params || this.params;
    }

    size(size) {
        this._size = [size, size];
        return this;
    }

    color(color) {
        this._color = color;
        return this;
    }

    render(value, asGlyph=true) {
        return <g transform={this.pos(this._size, asGlyph)}>
            {this.template(this.params[value]) || null}
        </g>
    }
}

class GlyphSet {
    constructor(ds) {
        this.dsName = ds;
        this.glyphSet = null;
        this.glyphSetName = null;
        for (const glyphSetName of Object.keys(glyphSets))
            if (ds.startsWith(glyphSetName)) {
                this.glyphSetName = glyphSetName;
                this.glyphSet = glyphSets[glyphSetName]
            }
        if (!this.glyphSet)
            console.warn('Unrecognized dataset name: ' + ds);
    }

    attr(attr) {
        if (!this.glyphSet) return new Renderer(null);
        if (this.glyphSet.hasOwnProperty(attr)) return new Renderer(this.glyphSet[attr]);
        console.warn(`Attribute ${attr} is not in the glyph set of ${this.glyphSetName}!`)
    }

    static dataset(ds) {
        return new GlyphSet(ds);
    }
}

export default GlyphSet;
