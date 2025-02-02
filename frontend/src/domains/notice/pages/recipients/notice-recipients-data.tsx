import * as React from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useGetNoticeRecipientsQuery } from '../../api';
import { NoticeRecipientWithIdAndRoleName } from '../../types';
import { DeleteRecipient } from '../../components';

export const RecipientData = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [recipientId, setRecipientId] = React.useState<number>(0);
  const { data, isLoading, isError, error } = useGetNoticeRecipientsQuery();

  const columns: MRT_ColumnDef<NoticeRecipientWithIdAndRoleName>[] = React.useMemo(
    () => [
      {
        accessorKey: 'roleName',
        header: 'Role'
      },
      {
        accessorKey: 'primaryDependentName',
        header: 'Dependent Name'
      },
      {
        accessorKey: 'primaryDependentSelect',
        header: 'Dependent Select'
      }
    ],
    []
  );

  const openModal = (id: number) => {
    setRecipientId(id);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const table = useMaterialReactTable({
    data: isError ? [] : data?.noticeRecipients || [],
    columns,
    state: {
      isLoading,
      density: 'compact'
    },
    enableDensityToggle: false,
    getRowId: (row) => row?.id?.toString(),
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => {
      const {
        original: { id }
      } = row;
      return (
        <>
          <IconButton
            title='Edit class'
            color='info'
            component={Link}
            to={`/app/notices/recipients/edit/${id}`}
          >
            <Edit />
          </IconButton>
          <IconButton title='Delete class' color='error' onClick={() => openModal(id)}>
            <Delete />
          </IconButton>
        </>
      );
    },
    renderEmptyRowsFallback: () => {
      const errorMsg = isError ? getErrorMsg(error).message : 'No records to display';
      return <Box sx={{ textAlign: 'center', fontStyle: 'italic', my: 3 }}>{errorMsg}</Box>;
    }
  });

  return (
    <>
      <Box component={Paper} sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
        <MaterialReactTable table={table} />
      </Box>

      {modalOpen && <DeleteRecipient recipientId={recipientId} closeModal={closeModal} />}
    </>
  );
};
