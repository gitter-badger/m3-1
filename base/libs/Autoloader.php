<?php
namespace M3;

use M3;

/**
 * Class autoloader. 
 */
class Autoloader
{
    private static $namespaces = [
        'M3\\' => [
            [M3\BASE_PATH, 'base/libs'],
        ],
    ];

    /**
     * Class file locator
     *
     * @param string $class Full qualified class name
     *
     * @return string|null
     */
    public static function locate($class)
    {
        $search_paths = [];

        // Primero exploramos las clases que no tienen un namespace
        // definido en self::$namespaces. Pueden ser del proyecto, o
        // pueden ser de terceras partes, dentro de vendor/

        if (defined('M3\\PROJECT_PATH')) {
            $search_paths = [
                [M3\PROJECT_PATH, 'apps'],
                [M3\PROJECT_PATH, 'base'],
                [M3\PROJECT_PATH, 'vendor'],
            ];
        }

        $search_paths = array_merge($search_paths,[
            [M3\BASE_PATH, 'apps'],
            [M3\BASE_PATH, 'vendor'],
        ]);

        $file_path = strtr($class, '\\', '/') . '.php';
        foreach ($search_paths as $base_path) {
            $path = M3\Path\join ($base_path, $file_path);
            // Existe?
            if (file_exists($path)) {
                return $path;
            }
        }

        // Ahora exploramos los namespaces
        foreach (self::$namespaces as $namespacename => $paths) {
            $namelen = strlen($namespacename);
            if (substr($class, 0, $namelen) == $namespacename) {
                $subnamespace = substr($class, $namelen);
                $file_path = strtr($subnamespace, '\\', '/') . '.php';                
                // Good. Existe el fichero?
                foreach ($paths as $path) {
                    $target = M3\Path\join($path, $file_path);
                    if (file_exists($target)) {
                        return $target;
                    }
                }    
            }
        }

        // No encontramos nada.
        return null;
    }

    public static function autoloader($class)
    {
        // Ubicamos el fichero
        $path = self::locate($class);

        if ($path) {
            require $path;
        }
    }
    
    public static function register()
    {
        // No nos registramos en el CLI, por que eso sucede antes
        if (class_exists('M3') && M3::$execution_type == 'cli') {
            return;
        }   

        spl_autoload_register('self::autoloader');
    }
}
