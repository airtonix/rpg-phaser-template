#!/bin/sh

#
# Pre Launch Runtime Tasks
#
ENTRYPOINT_TASKS_DIR=${ENTRYPOINT_TASKS_DIR:-/tasks}
echo "[ENTRYPOINT]: ${ENTRYPOINT_TASKS_DIR}"

if [ -d "$ENTRYPOINT_TASKS_DIR" ]
then
  /bin/run-parts "$ENTRYPOINT_TASKS_DIR"
fi

#
# Launch CMD
#
exec "$@"
