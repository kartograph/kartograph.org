Author: Esmit Pérez - esmitperez@gmail.com - @esmitperez
https://github.com/esmitperez/Ujko-svg
July 2014

# Create your very own Docker image to run kartograph

This Docerfile defines a basic image to run docker. Just
  docker build -t yourusername/kartograph .

# Linux/Mac OSX (Linux require sudo)

   docker run -ti -v `pwd`:/workdir esmitperez/kartograph \
	   --pretty-print \
	   --style /workdir/css/cr.css \
	   -o /workdir/svg/cr-ultralow-res.svg \
	   /workdir/configs/distritos.config.json

# Tips:

- If you are using Docker in MacOSX read this first:

  https://medium.com/boot2docker-lightweight-linux-for-docker/boot2docker-together-with-virtualbox-guest-additions-da1e3ab2465c

- Always map /workdir with '-v /folder/en/su/pc:/workdir'

