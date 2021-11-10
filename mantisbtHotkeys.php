<?php
class mantisbtHotkeysPlugin extends MantisPlugin {

	const HK_ENABLED = 'plugin_mantisbtHotkeys_enabled';

	function register() {
        $this->name = plugin_lang_get( 'title' );
        $this->description = plugin_lang_get( 'description' );
        $this->page = 'config';
        $this->version = '1.0.0';   
        $this->requires = array(    
            'MantisCore' => '2.0',  
                                    
        );
        $this->author = '@rohzart';
		$this->url = 'https://github.com/rohzart/mantisbtHotkeys';
    }

    function hooks() {
        return array(
			'EVENT_LAYOUT_PAGE_FOOTER' => 'scripts',
			'EVENT_ACCOUNT_PREF_UPDATE_FORM' => 'account_update_form',
			'EVENT_ACCOUNT_PREF_UPDATE' => 'account_update',
		);
    }

	function scripts()
	{
		if( $this->is_enabled() ) 
            echo '<script type="text/javascript" src="' . plugin_file( 'hotkeys.js' ) . '"></script>';
	}

	function is_enabled()
	{
		return auth_is_user_authenticated() && config_get( self::HK_ENABLED, false, auth_get_current_user_id(), ALL_PROJECTS );;
	}

	function account_update_form( $p_event, $p_user_id )
	{
		echo '<tr>' .
				 '<td class="category">' .
					'Enable Hotkeys' .
				 '</td>' .
				 '<td>' .
					 '<input id="EnableHotkeys" type="checkbox" name="' . self::HK_ENABLED . '" value="1" ' . ( $this->is_enabled() ? 'checked' : '' ) . '/>' .
				 '</td>' .
			 '</tr>';
	}

	function account_update( $p_event, $p_user_id )
	{
		config_set( self::HK_ENABLED, gpc_get_bool( self::HK_ENABLED, false ), $p_user_id, ALL_PROJECTS );
	}

}
