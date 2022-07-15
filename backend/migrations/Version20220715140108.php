<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220715140108 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE level ADD level_type_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE level ADD CONSTRAINT FK_9AEACC1364E4A98C FOREIGN KEY (level_type_id) REFERENCES level_type (id)');
        $this->addSql('CREATE INDEX IDX_9AEACC1364E4A98C ON level (level_type_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE level DROP FOREIGN KEY FK_9AEACC1364E4A98C');
        $this->addSql('DROP INDEX IDX_9AEACC1364E4A98C ON level');
        $this->addSql('ALTER TABLE level DROP level_type_id');
    }
}
