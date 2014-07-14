####################################################################################
#
# Run Kartograph in an easily portable container.
#
####################################################################################

FROM ubuntu:trusty

MAINTAINER Esmit Pérez <esmitperez@gmail.com> @esmitperez

RUN apt-get update
RUN apt-get install -y python-software-properties #software-properties-common

# Dependency not present in Docker's ubuntu:trusty
RUN apt-get install -y zlib1g-dev

# From Kartograph.org
RUN apt-get install -y libxslt1-dev python-dev python-shapely python-gdal python-pyproj python-pip
RUN pip install https://github.com/kartograph/kartograph.py/zipball/master -r https://raw.github.com/kartograph/kartograph.py/master/requirements.txt

VOLUME /workdir
ADD README.md /tmp/splash.txt
ADD runk.sh /runk.sh

# - Run Kartograph :)
ENTRYPOINT ["/./runk.sh"] 
