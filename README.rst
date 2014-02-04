Geonode_Bollettini
========================

geonode app for bollettini leaflet map.


Installation
------------

Install geonode with::

    $ sudo add-apt-repository ppa:geonode/testing

    $ sudo apt-get update

    $ sudo apt-get install geonode

Install django-leaflet::

    $ pip install django-leaflet

Install django-geojson::

    $ pip install django-geojson

Install and start geonode_bollettini::

    $ git clone https://github.com/pcasciano/geonode_bollettini.git
    $ cd geonode_bollettini
    $ python manage.py runserver

Usage
-----

set 'gisdata' database values in local_settings.py::

       'gisdata': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'database_name',
        'USER': 'geonode',
        'PASSWORD': 'geonode',
        'HOST': 'localhost',
        'PORT': '5432',
    }

note: it works with three db tables called 'bollettino_oggi', 'bollettino_domani', 'bollettino_dopodomani'
