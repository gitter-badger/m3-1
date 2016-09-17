# M3 Framework

[![Join the chat at https://gitter.im/M3framework/m3](https://badges.gitter.im/M3framework/m3.svg)](https://gitter.im/M3framework/m3?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

**M3** is a PHP framework for fast developing web applications using the MVP design pattern.

M3 doesn't requiere root privileges for installing it, so a M3 application runs smoothly on a shared server like Cpanel. You can even have several M3 applications in separated directories, each one with its own M3 version.

**WARNING**: M3 is in a **very-very-alpha** stage of development. Many parts are incomplete, and the API can change in any moment. For now, it's not suitable for production environments. Use it at your own risk.

# Requirements

* PHP 5.6 or 7+ with `CLI`, and modules `mbstring` and `fileinfo` installed.

# Quickstart 

* Clone this repo inside a directory included in the [include_path](http://php.net/manual/en/ini.core.php#ini.include-path) PHP directive.

```
git clone -b dev git@github.com:M3framework/m3.git
```
If you doesn't have access to any of the `include_path` directories nor alter the PHP directive value, just clone it anywhere, and set the environment variable M3_BASE_PATH with its full path

```
cd /home/oliver
git clone -b dev git@github.com:M3framework/m3.git
export M3_BASE_PATH=~/m3
```

* Set up access to the `m3` administration script.

You can either create a symbolic link inside a directory listed in the `PATH` environment variable:

```
ln -s path/to/the/m3/bin/m3 /usr/local/bin
```

Or you can alter the `PATH`:

```
export PATH=path/to/the/m3/bin:$PATH
```

* Create a new M3 project with the command `m3 init`.

```
m3 init myapp
```

This will create a `myapp` directory with a basic project structure.

* Launch a development server:

```
cd myapp
m3 server
```

Point your web browser to http://localhost:8888 and you're ready to go.

# Documentation

It's nonexistent :sweat_smile: I'm working on that. You can ask me question on the [Gitter chat](https://gitter.im/M3framework/Lobby#).