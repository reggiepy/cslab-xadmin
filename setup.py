#!/usr/bin/env python
from io import open
from setuptools import setup
# version_tuple = __import__('xadmin').VERSION
# version = ".".join([str(v) for v in version_tuple])

setup(
    name='cslab-xadmin',
    version='3.0.1',
    description='Optimized xadmin fork for Django 3.0, maintained by OBR CSLAB team.',
    long_description=open('README.rst', encoding='utf-8').read(),
    long_description_content_type='text/x-rst',
    author='OBR CSLAB',
    author_email='sshwsfc@gmail.com',
    license=open('LICENSE', encoding='utf-8').read(),
    url='https://github.com/reggiepy/cslab-xadmin',
    download_url='https://github.com/reggiepy/cslab-xadmin/archive/master.zip',
    packages=['xadmin', 'xadmin.migrations', 'xadmin.plugins', 'xadmin.templatetags', 'xadmin.views'],
    include_package_data=True,
    install_requires=[
        'setuptools',
        'django>=3.0,<4.0',
        'django-crispy-forms>=1.12.0',
        'django-reversion>=3.0.0',
        'django-formtools>=2.3',
        'django-import-export>=2.5.0',
        'httplib2>=0.9.2',
        'future',
        'six'
    ],
    extras_require={
        'Excel': ['xlwt', 'xlsxwriter'],
        'Reversion': ['django-reversion>=3.0.0'],
    },
    zip_safe=False,
    keywords=['admin', 'django', 'xadmin', 'bootstrap'],
    classifiers=[
        'Development Status :: 4 - Beta',
        'Environment :: Web Environment',
        'Framework :: Django',
        'Framework :: Django :: 3.0',
        'Framework :: Django :: 3.2',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Operating System :: OS Independent',
        "Programming Language :: JavaScript",
        'Programming Language :: Python',
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: Dynamic Content",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ]
)
