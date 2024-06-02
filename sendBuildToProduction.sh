#!/bin/bash
scp frontend/dist/*.png root@181.215.68.250:/root/frontendBuild
scp frontend/dist/*.html root@181.215.68.250:/root/frontendBuild
scp frontend/dist/assets/* root@181.215.68.250:/root/frontendBuild/assets

