# cslab-xadmin (OBR CSLAB Django 3 Fork)

**cslab-xadmin** is a drop-in replacement of Django admin for **Django 3.0/3.2**, maintained by the OBR CSLAB team.

It is fully extensible with plugin support and features a pretty UI based on Twitter Bootstrap 3.

## Key Features

- **Django 3.0+ Ready**: Fully compatible with Django 3.0 and 3.2 LTS.
- **Modern Python**: Optimized for Python 3.6 - 3.10.
- **Built-in Plugins**: Includes export, import, charts, dashboard, and more.
- **Bootstrap 3**: Clean and responsive user interface based on Twitter Bootstrap with theme support.
- **Better UX**: Enhanced filters, date ranges, number ranges, and in-site bookmarking.

## Quick Start

### Install

Installation via PyPI:

```bash
pip install cslab-xadmin
```

Or install from source:

```bash
pip install git+https://github.com/reggiepy/cslab-xadmin.git
```

### Install Requires

- [django](http://djangoproject.com) >=3.0, <4.0
- [django-crispy-forms](http://django-crispy-forms.rtfd.org) >=1.12.0
- [django-import-export](https://github.com/django-import-export/django-import-export) >=2.5.0
- [django-reversion](https://github.com/etianen/django-reversion) >=3.0.0
- [django-formtools](https://github.com/django/django-formtools) >=2.3
- [six](https://github.com/benjaminp/six)

## Usage

Add `xadmin` and `crispy_forms` to your `INSTALLED_APPS`:

```python
INSTALLED_APPS = (
    ...
    'xadmin',
    'crispy_forms',
    'reversion', # optional
)
```

And replace the default `admin.site.urls` in your `urls.py`:

```python
import xadmin
xadmin.autodiscover()

from xadmin.plugins import xversion
xversion.register_models()

urlpatterns = [
    path(r'xadmin/', xadmin.site.urls),
]
```

## Run Demo Locally

```bash
cd demo_app
python manage.py migrate
python manage.py runserver
```

Open http://127.0.0.1:8000 in your browser, the admin user password is `admin`.

## License

BSD License. See the LICENSE file for details.
