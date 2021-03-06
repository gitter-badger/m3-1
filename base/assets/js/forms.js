forms = { 

    tag:function (data) {

        name = data[0]
        options = data[1]
        content = data[2]

        var t = document.createElement ( name )

        for ( key in options ) {

            value = options [ key ]

            // HACK FEO. "class" es "className" en javascript
            if ( key.toLowerCase() == 'class' )
                key = 'className'

            t[ key ] = value 
        }

        t.innerHTML = content 

        return t
    },


    /**
     *  Coloca los valores y mensajes en un formulario
     */
    set: function(form, data)  {

        if ( typeof (form) == "string" ) 
            form = m3.id ( form )

        if ( ! form.m3_properties ) {
            window.alert ( "M3 ERROR: You need to activate the 'ajax_sendproperties' to this form first." );
            return false
        }
        properties = form.m3_properties

        // Dentro de 'controls' está el array de... controles
        for ( cname in data.controls ) {
            
            control = m3.id ( cname )

            // Existe el control?
            if ( control ) { 
                value = data.controls[cname]['value']

                switch ( control.nodeName.toLowerCase() ) {
                case 'input':
                    control.value = value
                }

            }

            // Colocamos los mensajes
            msgcont = m3.id ( properties.html_prefix_messageblock_id + cname )

            // Borramos

            // Solo ejecutamos si existe el msgcont. Los campos input hidden
            // no tienen este bloque.
            if ( msgcont ) {
                msgcont.innerHTML = ''

                for ( msgid in data.controls[cname]['messages']) {

                    message = data.controls[cname]['messages'][msgid]

                    // Creamos el tag
                    block = forms.tag ( properties.html_message )
                    block.innerHTML = message 

                    msgcont.appendChild ( block )
                }
            }
        }
    },

    /**
    * Resetea los campos del formulario, al igual que sus mensajes
    */
    reset:function(form, data ) {

        if ( typeof (form) == "string" ) 
            form = m3.id ( form )

        fp = form.m3_properties

        // Dentro de 'controls' está el array de... controles
        for ( cname in data.controls ) {
            
            control = m3.id ( cname )

            // Existe el control?
            if ( control ) { 

                switch ( control.nodeName.toLowerCase() ) {
                case 'input':
                    switch ( control.type ) {
                        case 'checkbox':
                            control.checked = false
                            break
                        default:
                            control.value = ''    
                    }
                    
                    break
                }

            }

            // Colocamos los mensajes
            msgcont = m3.id ( fp.html_prefix_messageblock_id + cname )

            // Borramos
            if ( msgcont ) {
                msgcont.innerHTML = ''
            }
        }
    },

    /**
     * Crea un formulario
     */
    create: function( options ) {
        /*
            Opciones: action, method, content, submit
        */

        form = m3.c ('form', {
            action: options.action,
            method: options.method ? options.method : 'get',
        })

        if ( typeof options.content == "string" ) {
            form.innerHTML = options.content
        }

        submit = m3.c ('button', {
            type: 'submit',
        }, options.submit ? options.submit : 'Submit form' )

        form.appendChild ( submit )

        return form
    }

}