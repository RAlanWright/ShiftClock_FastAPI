"""create_main_tables

Revision ID: e4864434b43a
Revises: 
Create Date: 2021-07-12 22:13:33.910889

"""
from alembic import op
import sqlalchemy as sa


revision = 'e4864434b43a'
down_revision = None
branch_labels = None
depends_on = None


def create_shifts_table() -> None:
    op.create_table(
        "shifts",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.Text, nullable=False, index=True),
        sa.Column("date", sa.Date, nullable=False),
        sa.Column("startTime", sa.DateTime, nullable=False),
        sa.Column("endTime", sa.DateTime, nullable=False),
    )


def upgrade() -> None:
    create_shifts_table()


def downgrade() -> None:
    op.drop_table("shifts")
