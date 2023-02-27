const
	REPLACEMENT_TOKEN = '{{{ at-replacement }}}',
	TOKEN_REGEX = new RegExp(REPLACEMENT_TOKEN, 'g')
;

function restoreAt(str){
	return str.replace(TOKEN_REGEX, '@');
}

exports.handlers = {
	jsdocCommentFound(e){
		e.comment = e.comment.replace(/\\@/g, REPLACEMENT_TOKEN);
	},

	newDoclet(e){
		if( e.doclet.description ){
			e.doclet.description = restoreAt(e.doclet.description);
		}

		if( e.doclet.classdesc ){
			e.doclet.classdesc = restoreAt(e.doclet.classdesc);
		}

		if( e.doclet.examples ){
			e.doclet.examples = e.doclet.examples.map(restoreAt);
		}
	}
};
